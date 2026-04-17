-- profiles 테이블: 사용자 프로필 및 구독 정보 관리
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  nickname text not null default 'Vibe User',
  avatar_url text,
  diamond_balance int not null default 20,
  referral_code text unique not null default 'VIBE-' || upper(substr(gen_random_uuid()::text, 1, 6)),
  referred_by text,
  invite_count int not null default 0,
  is_subscribed boolean not null default false,
  subscription_expires_at timestamptz,
  created_at timestamptz default now()
);

-- style_logs 테이블: AI 스타일 분석 결과 히스토리
create table style_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  vibe_type text not null,
  before_image_url text,
  after_image_url text,
  color_season text not null,
  ita_value int not null,
  body_shape text not null,
  skin_tone_hex text,
  best_colors text[] default '{}',
  avoid_colors text[] default '{}',
  style_suggestions text[] default '{}',
  confidence_score int not null default 90,
  created_at timestamptz default now()
);

-- diamond_logs 테이블: 다이아몬드 획득/사용 내역
create table diamond_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  event_type text not null,
  amount int not null,
  balance_after int not null,
  description text not null,
  created_at timestamptz default now()
);

-- products 테이블: 추천 상품 정보
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  brand text not null,
  price int not null,
  image_url text,
  coupang_url text,
  category text,
  vibe_type text[] default '{}',
  color_season text[] default '{}'
);

-- inventory 테이블: 사용자가 구매하거나 찜한 아이템
create table inventory (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  is_purchased boolean default false,
  purchased_at timestamptz,
  unique(user_id, product_id)
);

-- 신규 가입 시 profiles 자동 생성 트리거
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, nickname)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'nickname', 'Vibe User')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- 다이아 차감 RPC
create or replace function decrement_diamonds(p_user_id uuid, p_amount int)
returns void language plpgsql security definer as $$
begin
  update profiles set diamond_balance = diamond_balance - p_amount where id = p_user_id;
  insert into diamond_logs (user_id, event_type, amount, balance_after, description)
  values (p_user_id, 'analysis', -p_amount,
    (select diamond_balance from profiles where id = p_user_id),
    'AI 스타일 분석');
end;
$$;

-- 다이아 지급 RPC
create or replace function grant_diamonds(p_user_id uuid, p_amount int, p_description text)
returns void language plpgsql security definer as $$
begin
  update profiles set diamond_balance = diamond_balance + p_amount where id = p_user_id;
  insert into diamond_logs (user_id, event_type, amount, balance_after, description)
  values (p_user_id, 'reward', p_amount,
    (select diamond_balance from profiles where id = p_user_id),
    p_description);
end;
$$;

-- RLS 활성화
alter table profiles enable row level security;
alter table style_logs enable row level security;
alter table diamond_logs enable row level security;
alter table inventory enable row level security;

-- RLS 정책
create policy "본인 프로필만 조회/수정" on profiles for all using (auth.uid() = id);
create policy "본인 로그만 조회" on style_logs for all using (auth.uid() = user_id);
create policy "본인 다이아 내역만 조회" on diamond_logs for all using (auth.uid() = user_id);
create policy "상품은 모두 조회 가능" on products for select using (true);
create policy "본인 인벤토리만 관리" on inventory for all using (auth.uid() = user_id);

-- 1. style-images 버킷 생성 및 설정
-- 이미 존재하더라도 public 설정을 위해 다시 실행할 수 있습니다.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'style-images', 
  'style-images', 
  true, 
  5242880, -- 5MB 제한
  '{image/jpeg,image/png,image/webp}'
)
on conflict (id) do update 
set public = true, 
    file_size_limit = 5242880,
    allowed_mime_types = '{image/jpeg,image/png,image/webp}';

-- 2. 스토리지 RLS 활성화
-- storage.objects 테이블에 RLS가 켜져 있는지 확인
alter table storage.objects enable row level security;

-- 3. 기존 정책 삭제 (재실행 가능하도록)
drop policy if exists "Authenticated users can upload images" on storage.objects;
drop policy if exists "Anyone can view style images" on storage.objects;
drop policy if exists "Users can update their own images" on storage.objects;
drop policy if exists "Users can delete their own images" on storage.objects;

-- 4. 신규 정책 생성 (보안 강화형: 사용자별 폴더 격리)
-- 업로드 정책: 본인 ID로 시작하는 폴더에만 업로드 허용
create policy "Authenticated users can upload images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'style-images' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 조회 정책: 누구나 공개적으로 조회 가능 (Public Bucket이므로)
create policy "Anyone can view style images"
on storage.objects for select
to public
using (bucket_id = 'style-images');

-- 수정/삭제 정책: 본인 파일만 관리 가능
create policy "Users can update their own images"
on storage.objects for update
to authenticated
using (bucket_id = 'style-images' AND (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can delete their own images"
on storage.objects for delete
to authenticated
using (bucket_id = 'style-images' AND (storage.foldername(name))[1] = auth.uid()::text);

-- 5. style_logs 테이블 RLS 정책 보완
drop policy if exists "본인 로그만 조회" on public.style_logs;

create policy "Users can manage their own style logs"
on public.style_logs
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- 6. profiles 테이블 RLS 정책 보완
drop policy if exists "본인 프로필만 조회/수정" on public.profiles;

create policy "Users can manage their own profile"
on public.profiles
for all
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

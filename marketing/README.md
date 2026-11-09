# Marketing assets

Not part of the website: nothing in this folder is served or deployed
(Next.js only serves `public/`).

## gbp-photos/

Photos for the Google Business Profile, exported from the website's own
images as JPG/PNG (Google does not accept WebP).

| Folder | Use |
|---|---|
| `1-logo/` | Profile logo |
| `2-cover/` | Cover photo (Packages Shopping Festival board) |
| `3-campaigns/` | 11 client campaigns on our boards; the sharpest images, upload first |
| `4-billboard-sites/` | 34 individual billboard sites (646 px wide) |

To regenerate after site photos change, convert `public/media/work/*.webp`
and `public/media/sites/*.webp` to JPG.

## Outstanding Google tasks

Run these from a Claude session on the local computer, using the built-in
browser (already signed in to Google):

1. **Search Console** (`https://www.fangrovemedia.org/` property) →
   URL Inspection → Request indexing for:
   - `https://www.fangrovemedia.org/`
   - `https://www.fangrovemedia.org/services/media-campaigns`
   - `https://www.fangrovemedia.org/blog/best-billboard-company-lahore`
   - `https://www.fangrovemedia.org/blog/best-media-company-lahore`
   - `https://www.fangrovemedia.org/blog/what-is-outdoor-media`
2. **Google Business Profile** "Fangrove Media" (amanan200@gmail.com):
   - Edit profile → Location → postcode **54600**
   - Photos → logo from `1-logo/`, cover from `2-cover/`, then the
     photos in `3-campaigns/` (and optionally `4-billboard-sites/`)

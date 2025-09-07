# Vercel Build Cache: Clearing/Forcing Fresh Build

If you fix file encodings (e.g., convert a TS/TSX file from UTF-16/ANSI to UTF-8) after a failed deployment, Vercel may reuse a stale build cache and still show an error like:

> Unexpected character '\u{...}' in path `src/components/.../YourFile.tsx`

To force a clean compile:

- UI: open the failed deployment → Redeploy → select "Clear build cache".
- CLI: `npx vercel --prod --force` to bypass cached artifacts.

This project also includes `.gitattributes` and `.editorconfig` to keep source files in UTF-8 with LF line endings to prevent future encoding issues.


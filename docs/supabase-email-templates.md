# Supabase auth email templates (Promitto)

Branded templates for Supabase Auth emails. Every button links to **promittoltd.com/auth/confirm**
(handled by `src/app/auth/confirm/page.tsx`) instead of the Supabase project domain, which helps
emails stay out of spam.

## Before you paste

1. Supabase → **Authentication** → **URL Configuration**
   - **Site URL:** `https://promittoltd.com`
   - **Redirect URLs:** add `https://promittoltd.com/**` (and `http://localhost:3000/**` for local testing)
2. Deploy the site version that includes `/auth/confirm` **before** changing the templates.
   Otherwise the new links will hit a page that doesn't exist yet.
3. Supabase → **Authentication** → **Emails** → **Templates**: for each template below, paste the
   **Subject** and the **Body** (the HTML block), then **Save**.

To undo, click **Reset to default** on a template.

Each link uses `{{ .SiteURL }}`, so it follows the Site URL setting. The `type` value differs per template, so
paste each block into its matching template.

---

## 1. Confirm signup

**Subject:** `Confirm your email for Promitto`

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#172554;padding:20px 32px;color:#ffffff;font-size:20px;font-weight:bold;">Promitto Limited</td></tr>
      <tr><td style="padding:32px;color:#111827;font-size:15px;line-height:1.6;">
        <p style="margin:0 0 16px;">Hello,</p>
        <p style="margin:0 0 16px;">Thank you for creating an account with Promitto Limited. Please confirm your email address to finish setting up your account.</p>
        <p style="margin:24px 0;text-align:center;">
          <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email"
             style="background:#F59E0B;color:#172554;text-decoration:none;font-weight:bold;padding:12px 28px;border-radius:999px;display:inline-block;">Confirm my email</a>
        </p>
        <p style="margin:0 0 16px;color:#4b5563;font-size:13px;">If you didn't create an account, you can ignore this email.</p>
      </td></tr>
      <tr><td style="padding:16px 32px;background:#f9fafb;color:#6b7280;font-size:12px;line-height:1.5;">
        Promitto Limited · Pension Towers, 13th floor, Loita Street, Nairobi · +254 729 506 506 · info@promittoltd.com
      </td></tr>
    </table>
  </td></tr>
</table>
```

---

## 2. Reset password

**Subject:** `Reset your Promitto password`

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#172554;padding:20px 32px;color:#ffffff;font-size:20px;font-weight:bold;">Promitto Limited</td></tr>
      <tr><td style="padding:32px;color:#111827;font-size:15px;line-height:1.6;">
        <p style="margin:0 0 16px;">Hello,</p>
        <p style="margin:0 0 16px;">We received a request to reset the password for your Promitto account. Click the button below to choose a new password.</p>
        <p style="margin:24px 0;text-align:center;">
          <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery"
             style="background:#F59E0B;color:#172554;text-decoration:none;font-weight:bold;padding:12px 28px;border-radius:999px;display:inline-block;">Reset my password</a>
        </p>
        <p style="margin:0 0 16px;color:#4b5563;font-size:13px;">If you didn't ask to reset your password, you can ignore this email. Your password won't change.</p>
      </td></tr>
      <tr><td style="padding:16px 32px;background:#f9fafb;color:#6b7280;font-size:12px;line-height:1.5;">
        Promitto Limited · Pension Towers, 13th floor, Loita Street, Nairobi · +254 729 506 506 · info@promittoltd.com
      </td></tr>
    </table>
  </td></tr>
</table>
```

---

## 3. Magic link

**Subject:** `Your Promitto sign-in link`

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#172554;padding:20px 32px;color:#ffffff;font-size:20px;font-weight:bold;">Promitto Limited</td></tr>
      <tr><td style="padding:32px;color:#111827;font-size:15px;line-height:1.6;">
        <p style="margin:0 0 16px;">Hello,</p>
        <p style="margin:0 0 16px;">Use the button below to sign in to your Promitto account.</p>
        <p style="margin:24px 0;text-align:center;">
          <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email"
             style="background:#F59E0B;color:#172554;text-decoration:none;font-weight:bold;padding:12px 28px;border-radius:999px;display:inline-block;">Sign in to Promitto</a>
        </p>
        <p style="margin:0 0 16px;color:#4b5563;font-size:13px;">If you didn't request this, you can ignore this email.</p>
      </td></tr>
      <tr><td style="padding:16px 32px;background:#f9fafb;color:#6b7280;font-size:12px;line-height:1.5;">
        Promitto Limited · Pension Towers, 13th floor, Loita Street, Nairobi · +254 729 506 506 · info@promittoltd.com
      </td></tr>
    </table>
  </td></tr>
</table>
```

---

## 4. Change email address

**Subject:** `Confirm your new email for Promitto`

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#172554;padding:20px 32px;color:#ffffff;font-size:20px;font-weight:bold;">Promitto Limited</td></tr>
      <tr><td style="padding:32px;color:#111827;font-size:15px;line-height:1.6;">
        <p style="margin:0 0 16px;">Hello,</p>
        <p style="margin:0 0 16px;">Please confirm that you want to change the email on your Promitto account from {{ .Email }} to {{ .NewEmail }}.</p>
        <p style="margin:24px 0;text-align:center;">
          <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email_change"
             style="background:#F59E0B;color:#172554;text-decoration:none;font-weight:bold;padding:12px 28px;border-radius:999px;display:inline-block;">Confirm new email</a>
        </p>
        <p style="margin:0 0 16px;color:#4b5563;font-size:13px;">If you didn't request this change, please contact us at info@promittoltd.com.</p>
      </td></tr>
      <tr><td style="padding:16px 32px;background:#f9fafb;color:#6b7280;font-size:12px;line-height:1.5;">
        Promitto Limited · Pension Towers, 13th floor, Loita Street, Nairobi · +254 729 506 506 · info@promittoltd.com
      </td></tr>
    </table>
  </td></tr>
</table>
```

---

## 5. Invite user

**Subject:** `You've been invited to Promitto`

```html
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#172554;padding:20px 32px;color:#ffffff;font-size:20px;font-weight:bold;">Promitto Limited</td></tr>
      <tr><td style="padding:32px;color:#111827;font-size:15px;line-height:1.6;">
        <p style="margin:0 0 16px;">Hello,</p>
        <p style="margin:0 0 16px;">You've been invited to create an account with Promitto Limited. Click the button below to accept the invitation.</p>
        <p style="margin:24px 0;text-align:center;">
          <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite"
             style="background:#F59E0B;color:#172554;text-decoration:none;font-weight:bold;padding:12px 28px;border-radius:999px;display:inline-block;">Accept invitation</a>
        </p>
        <p style="margin:0 0 16px;color:#4b5563;font-size:13px;">If you weren't expecting this invitation, you can ignore this email.</p>
      </td></tr>
      <tr><td style="padding:16px 32px;background:#f9fafb;color:#6b7280;font-size:12px;line-height:1.5;">
        Promitto Limited · Pension Towers, 13th floor, Loita Street, Nairobi · +254 729 506 506 · info@promittoltd.com
      </td></tr>
    </table>
  </td></tr>
</table>
```

---

## After switching

- Test each flow: sign up with a new address, use **Forgot password**, and (if used) change email.
- Links expire after a while and work only once. Expired or reused links show a "Link not valid"
  page with a button to request a new one.

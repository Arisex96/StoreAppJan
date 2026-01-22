now i wan to added .env.local
for dev and for production

but when i deploy on vercel it give me any urls , which one should i use?

reated
23bcs012-3412 Avatar
23bcs012-3412
11h ago
Status
Ready
Latest
Duration
40s
11h ago
Environment
Production
Current
Domains
store-app-jan-web.vercel.app
+1
store-app-jan-web-git-main-23bcs012-iiitdmjacis-projects.vercel.app
store-app-jan-cgajh31ic-23bcs012-iiitdmjacis-projects.vercel.app
Source
main
9542c70
trying again

Great question — this is **exactly the right moment** to get envs correct.

Vercel’s multiple URLs  *look confusing* , but the rule is actually simple.

---

## 🧠 First: understand the Vercel URLs you’re seeing

You’ll usually see  **3 types of domains** :

### 1️⃣ **Production Domain (THIS is the important one)**

<pre class="overflow-visible! px-0!" data-start="314" data-end="350"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" bis_skin_checked="1"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9" bis_skin_checked="1"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" bis_skin_checked="1"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" bis_skin_checked="1"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" bis_skin_checked="1"><code class="whitespace-pre!"><span><span>store-app-jan-web.vercel.app
</span></span></code></div></div></pre>

✔ Stable

✔ Never changes

✔ Use this in **production envs everywhere**

---

### 2️⃣ Preview (Git / branch specific)

<pre class="overflow-visible! px-0!" data-start="471" data-end="546"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" bis_skin_checked="1"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9" bis_skin_checked="1"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" bis_skin_checked="1"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" bis_skin_checked="1"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" bis_skin_checked="1"><code class="whitespace-pre!"><span><span>store-app-jan-web-git-</span><span>main</span><span>-</span><span>23</span><span>bcs012-iiitdmjacis-projects</span><span>.vercel</span><span>.app</span><span>
</span></span></code></div></div></pre>

✔ Created per commit / PR

❌ Changes often

❌ DO NOT hardcode anywhere

---

### 3️⃣ Deployment-specific (internal)

<pre class="overflow-visible! px-0!" data-start="665" data-end="737"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" bis_skin_checked="1"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9" bis_skin_checked="1"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" bis_skin_checked="1"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" bis_skin_checked="1"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" bis_skin_checked="1"><code class="whitespace-pre!"><span><span>store-app-jan-cgajh31ic-23bcs012-iiitdmjacis-projects.vercel.app
</span></span></code></div></div></pre>

✔ Internal to Vercel

❌ Ephemeral

❌ Never use in envs

---

## ✅ Which URL should YOU use?

> **Always use the Production domain**

<pre class="overflow-visible! px-0!" data-start="873" data-end="917"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" bis_skin_checked="1"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9" bis_skin_checked="1"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" bis_skin_checked="1"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" bis_skin_checked="1"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" bis_skin_checked="1"><code class="whitespace-pre!"><span><span>https:</span><span>//store-app-jan-web.vercel.app</span><span>
</span></span></code></div></div></pre>

This is the **only correct answer** for:

* Backend CORS
* Supabase allowed origins
* OAuth redirect URLs
* API allowlists

---

## 1️⃣ `.env.local` (DEV – local machine)

📍 `apps/web/.env.local`

<pre class="overflow-visible! px-0!" data-start="1115" data-end="1209"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" bis_skin_checked="1"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9" bis_skin_checked="1"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" bis_skin_checked="1"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" bis_skin_checked="1"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" bis_skin_checked="1"><code class="whitespace-pre! language-env"><span>NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
</span></code></div></div></pre>

📍 `apps/backend/.env`

<pre class="overflow-visible! px-0!" data-start="1234" data-end="1288"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" bis_skin_checked="1"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9" bis_skin_checked="1"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" bis_skin_checked="1"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" bis_skin_checked="1"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" bis_skin_checked="1"><code class="whitespace-pre! language-env"><span>PORT=4000
CORS_ORIGIN=http://localhost:3000
</span></code></div></div></pre>

✔ Used only locally

✔ Never committed

---

## 2️⃣ Vercel Environment Variables (PRODUCTION)

Go to:

**Vercel → Project → Settings → Environment Variables**

Add:

<pre class="overflow-visible! px-0!" data-start="1456" data-end="1577"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" bis_skin_checked="1"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9" bis_skin_checked="1"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" bis_skin_checked="1"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" bis_skin_checked="1"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" bis_skin_checked="1"><code class="whitespace-pre! language-env"><span>NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_APP_URL=https://store-app-jan-web.vercel.app
</span></code></div></div></pre>

⚠️ Select:

* Environment → **Production**
* (Optional) Preview if you want preview support

---

## 3️⃣ Backend (Render) production env

On  **Render → Environment Variables** :

<pre class="overflow-visible! px-0!" data-start="1756" data-end="1826"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" bis_skin_checked="1"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9" bis_skin_checked="1"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" bis_skin_checked="1"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" bis_skin_checked="1"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" bis_skin_checked="1"><code class="whitespace-pre! language-env"><span>PORT=10000
CORS_ORIGIN=https://store-app-jan-web.vercel.app
</span></code></div></div></pre>

✔ NOT the preview URL

✔ ONLY the production domain

---

## 4️⃣ CORS setup (Express)

<pre class="overflow-visible! px-0!" data-start="1916" data-end="2011"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" bis_skin_checked="1"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9" bis_skin_checked="1"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" bis_skin_checked="1"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" bis_skin_checked="1"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" bis_skin_checked="1"><code class="whitespace-pre! language-ts"><span><span>app.</span><span>use</span><span>(
  </span><span>cors</span><span>({
    </span><span>origin</span><span>: process.</span><span>env</span><span>.</span><span>CORS_ORIGIN</span><span>,
    </span><span>credentials</span><span>: </span><span>true</span><span>,
  })
);
</span></span></code></div></div></pre>

---

## 5️⃣ Why NOT use preview URLs?

| Reason              | Impact                 |
| ------------------- | ---------------------- |
| They change         | Break backend          |
| Multiple per commit | Impossible to maintain |
| Not stable          | Bad architecture       |
| OAuth fails         | Redirect mismatch      |

Preview URLs are for  **testing UI only** , not backend contracts.

---

## 6️⃣ How Vercel resolves envs

| Environment                   | Used when       |
| ----------------------------- | --------------- |
| `.env.local`                | `npm run dev` |
| Vercel**Production**env | `main`branch  |
| Vercel**Preview**env    | PR deployments  |

So:

* `main` → production domain
* `.env.local` → localhost

---

## 🧠 Final mental model (keep this)

<pre class="overflow-visible! px-0!" data-start="2592" data-end="2744"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary" bis_skin_checked="1"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9" bis_skin_checked="1"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2" bis_skin_checked="1"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs" bis_skin_checked="1"></div></div></div><div class="overflow-y-auto p-4" dir="ltr" bis_skin_checked="1"><code class="whitespace-pre!"><span><span>LOCAL DEV
</span><span>Frontend: localhost:3000</span><span>
</span><span>Backend: localhost:4000</span><span>

PRODUCTION
</span><span>Frontend: store-app-jan-web.vercel.app</span><span>
</span><span>Backend: your-backend.onrender.com</span><span>
</span></span></code></div></div></pre>

---

## ✅ Quick checklist (do this now)

✔ Use **store-app-jan-web.vercel.app**

✔ Set it in backend CORS

✔ Set it in Vercel env vars

✔ Ignore preview URLs

✔ Keep `.env.local` for dev only

---

You’re doing this **correctly** — most people mess this up badly.

If you want, next I can:

* Validate your **exact env variable list**
* Set up **Preview envs properly**
* Explain **why NEXT_PUBLIC exists**
* Add **multi-env support in TurboRepo**

Just say 👍

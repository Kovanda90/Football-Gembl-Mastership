# Nasazení FGM aplikace online

## 🚀 Rychlé nasazení na Vercel

### 1. Příprava projektu

```bash
# Zkontrolujte, že máte Node.js 18+ nainstalovaný
node --version

# Instalace závislostí
npm install

# Test lokálního spuštění
npm run dev
```

### 2. Nasazení na Vercel

1. **Vytvořte účet na Vercel**: https://vercel.com
2. **Instalujte Vercel CLI**:
   ```bash
   npm i -g vercel
   ```
3. **Přihlaste se**:
   ```bash
   vercel login
   ```
4. **Nasajte projekt**:
   ```bash
   cd fgm
   vercel
   ```

### 3. Konfigurace proměnných prostředí

V Vercel dashboardu nastavte tyto proměnné prostředí:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Automatické nasazení

Připojte GitHub repository k Vercel pro automatické nasazení při push.

## 🌐 Alternativní nasazení

### Netlify

1. **Připojte GitHub repository** na https://netlify.com
2. **Nastavte build command**: `npm run build`
3. **Nastavte publish directory**: `.next`

### Railway

1. **Připojte GitHub repository** na https://railway.app
2. **Automaticky detekuje Next.js** a nasadí

## 📊 API Endpointy

### Bodování
- **URL**: `/api/results`
- **Metoda**: GET
- **Response**: JSON s bodováním včetně bonusových bodů

### Příklad použití:
```javascript
fetch('/api/results')
  .then(response => response.json())
  .then(data => {
    console.log('Bodování:', data.data.leaderboard);
  });
```

## 🎯 Funkce aplikace

### ✅ Implementované
- ✅ Bodování za výsledky (3/2/1 body)
- ✅ Bodování za střelce (1 bod za gól)
- ✅ **Bonusový bod pro vítěze ve střelcích** (+1 bod do výsledků)
- ✅ Hattrick bonus (+2 body za 3+ góly)
- ✅ API endpoint pro získání bodování
- ✅ Online leaderboard stránka

### 📱 Dostupné stránky
- `/` - Přihlášení
- `/dashboard` - Admin dashboard (přihlášení jako admin)
- `/leaderboard` - Veřejné bodování

## 🔧 Konfigurace

### Lokální vývoj
```bash
npm run dev
# Otevře http://localhost:3000
```

### Produkční build
```bash
npm run build
npm start
```

## 📈 Monitoring

### Vercel Analytics
- Automaticky dostupné v Vercel dashboardu
- Sleduje výkon a chyby

### Logs
```bash
# Vercel logs
vercel logs

# Lokální logs
npm run dev
```

## 🔒 Bezpečnost

- Hesla jsou uložena lokálně (pro demo účely)
- V produkci doporučujeme implementovat proper autentizaci
- API endpointy jsou veřejné pro bodování

## 🚨 Troubleshooting

### Časté problémy

1. **Build failed**
   ```bash
   npm run build
   # Zkontrolujte chyby v konzoli
   ```

2. **API nefunguje**
   - Zkontrolujte, že server běží
   - Ověřte URL endpointu
   - Zkontrolujte CORS nastavení

3. **Bonusové body se nezobrazují**
   - Zkontrolujte console logy v prohlížeči
   - Ověřte, že jsou vyplněny výsledky kol

## 📞 Support

Pro technickou podporu kontaktujte vývojáře nebo vytvořte issue v GitHub repository.

---

**FGM - Football Gembl Mastership**  
*Vytvořeno pro partu 5 kamarádů* 🏆 
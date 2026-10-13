# KYARAEZ — Website + Google Sheets Database

Paket siap deploy: situs statis (GitHub Pages) + database gratis via Google Sheets & Apps Script.

## Isi paket

```
kyaraez-db/
├── website/           ← upload ke GitHub Pages (isi root repo)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── config.js      ← ISI URL WEB APP DI SINI
│   ├── CNAME
│   └── assets (png, favicon, …)
├── apps-script/
│   └── Code.gs        ← copy ke Google Apps Script
└── README.md          ← file ini
```

## Fitur baru

| Fitur | Sumber data |
|-------|-------------|
| Katalog produk dinamis + tombol keranjang | Sheet `Products` |
| Journal dinamis | Sheet `Journal` |
| Achievements dinamis | Sheet `Achievements` |
| Form kontak → simpan pesan | Sheet `Messages` |
| Order dari keranjang → simpan | Sheet `Orders` |
| Checkout via WhatsApp | Fallback tanpa Sheet |

Jika `config.js` belum diisi URL, situs tetap jalan dengan konten fallback statis.

---

## Langkah setup (urut)

### 1. Buat Google Spreadsheet

1. Buka [sheets.google.com](https://sheets.google.com) → **Blank spreadsheet**.
2. Rename file misal: `KYARAEZ Database`.
3. Biarkan sheet pertama apa adanya (nanti diisi otomatis oleh script).

### 2. Pasang Apps Script

1. Di Spreadsheet: **Extensions → Apps Script**.
2. Hapus kode default, **paste seluruh isi** `apps-script/Code.gs`.
3. Save (Ctrl+S), beri nama project misal `KYARAEZ API`.
4. Klik **Run** fungsi `ensureSetup` sekali (izinkan permission Google).
   - Atau setelah deploy, buka URL dengan `?action=setup`.
5. **Deploy → New deployment**:
   - Type: **Web app**
   - Description: `v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy → **Copy the Web app URL**  
     (bentuk: `https://script.google.com/macros/s/XXXX/exec`)

### 3. Isi website config

Buka `website/config.js`, ganti:

```js
WEB_APP_URL: "https://script.google.com/macros/s/XXXX/exec",
```

(Opsional) sesuaikan `WHATSAPP_NUMBER`.

### 4. Deploy ke GitHub Pages

1. Buat repo baru (atau pakai repo lama).
2. Upload **semua isi folder `website/`** ke root repo (bukan folder `website` itu sendiri).
3. Settings → Pages → Source: branch `main` / `master`, folder `/ (root)`.
4. Jika pakai custom domain, pastikan file `CNAME` tetap ada (`rezkya.my.id`).

### 5. Cek

- Buka situs → section Business harus memuat produk dari Sheet.
- Kirim form Contact → cek tab **Messages** di Spreadsheet.
- Tambah item ke keranjang → Order → cek tab **Orders**.

---

## Struktur sheet (otomatis dibuat)

### Products
| id | name | price | currency | description | image_url | category | stock | active | sort_order |
|----|------|-------|----------|-------------|-----------|----------|-------|--------|------------|

- `active` = `TRUE` agar tampil di website.
- `image_url` bisa pakai link Unsplash / Drive (public) / CDN.

### Messages
| timestamp | name | whatsapp | email | message | source | status |

### Orders
| timestamp | order_id | name | whatsapp | items_json | total | note | status |

### Journal
| id | title | tag | excerpt | image_url | date | link | active | sort_order |

### Achievements
| id | title | description | year | active | sort_order |

---

## Tips

- **Edit konten**: ubah baris di Spreadsheet → refresh website (cache browser ~beberapa detik).
- **Redeploy Apps Script**: hanya perlu jika mengubah `Code.gs`. Untuk data, cukup edit Sheet.
- **Kuota gratis**: Apps Script ~20.000 request/hari (cukup untuk traffic personal/small business).
- **CORS**: script sudah pakai `Content-Type: text/plain` agar POST tidak kena preflight.
- Jika produk tidak muncul: pastikan `active` = TRUE (boolean/centang), dan URL di `config.js` benar (tanpa spasi).

## Support flow order

1. Pengunjung tambah ke keranjang.
2. Buka keranjang (ikon 🛒) → isi nama + WA → **Kirim order** (masuk Sheet) atau **Checkout via WhatsApp** (chat langsung).

Selamat deploy!

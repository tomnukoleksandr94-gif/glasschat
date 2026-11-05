# GlassChat

Чат-рулетка знайомств з віртуальними співрозмовниками: один файл `index.html` (Vanilla JS), дизайн Liquid Glass, темна й світла теми, українська / англійська / французька / російська, голосове введення й озвучування через Web Speech API.

**Чесно про ботів:** співрозмовники — локальні віртуальні персонажі з продуманою логікою, а не реальні люди й не підключення до реальної AI-моделі.

## Швидкий старт

Просто відкрий `index.html` — усе працює без сервера й без Firebase (режим гостя).

## Увімкнення входу через Google та адмін-панелі (Firebase)

Без Firebase сайт повністю працює як рулетка, але вхід через Google і панель адміністратора вимкнені (з чесним повідомленням, без фальшивих кнопок). Щоб їх увімкнути:

### 1. Створити проєкт Firebase

1. Відкрий [console.firebase.google.com](https://console.firebase.google.com) → **Add project** (наприклад, `glasschat`).
2. **Authentication → Get started → Sign-in method → Google → Enable**.
3. **Authentication → Settings → Authorized domains** → додай домен, де живе сайт (наприклад, `tomnukoleksandr94-gif.github.io` і `localhost` для тестів).
4. **Firestore Database → Create database** (production mode, регіон наприклад `europe-west`).

### 2. Вставити конфіг

1. **Project settings (⚙) → General → Your apps → Web app (</>)** → зареєструй застосунок.
2. Скопіюй об'єкт `firebaseConfig` і встав значення в `firebase-config.js` (заміни `"..."`).
3. Опублікуй файл разом із сайтом.

`firebase-config.js` не містить секретів — `apiKey` це публічний ідентифікатор. Доступ захищають Security Rules, а не приховування ключа.

### 3. Опублікувати правила безпеки

Скопіюй вміст `firestore.rules` у **Firestore → Rules → Publish**.

Правила дають:

- читання `bots` і `config` — усім (сайт синхронізується);
- запис — **лише** акаунту з email `tomnukoleksandr94@gmail.com` (адмін);
- користувач може писати лише власний профіль у `users`.

Перевірка email адміністрації виконується **на сервері** (у правилах Firestore) — зміна HTML/JS у браузері не дає адмін-прав: запис буде відхилено.

### 4. Увімкнути адмінку

Увійди через Google з адреси `tomnukoleksandr94@gmail.com` → біля аватара з'явиться кнопка **Admin Panel**:

- **Дашборд** — активні/вимкнені боти, статус системи, кількість користувачів;
- **Боти** — увімкнення/вимкнення, редагування імені, опису, характеру, інтересів, типів; додавання й видалення ботів. Вимкнений бот ніколи не з'являється в рулетці. Якщо всі боти вимкнені — сайт показує «Зараз немає доступних співрозмовників»;
- **Налаштування** — рулетка on/off, голосові функції on/off, текстовий чат on/off, режим обслуговування, власний заголовок і підпис головного екрана.

Усі зміни зберігаються у Firestore і синхронізуються з основним сайтом у реальному часі (onSnapshot).

### 5. (Опційно) Серверна перевірка адміна через Cloud Functions

Правил Firestore достатньо для захисту записів. Якщо потрібна жорсткіша багаторівнева модель (наприклад, ролі в документі `admins`), розгорни Cloud Function:

```js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.setAdminClaim = functions.https.onCall(async (data, ctx) => {
  const ADMIN = "tomnukoleksandr94@gmail.com";
  if (!ctx.auth || ctx.auth.token.email !== ADMIN) {
    throw new functions.https.HttpsError("permission-denied", "Admin only");
  }
  await admin.auth().setCustomUserClaims(data.uid, { admin: true });
  return { ok: true };
});
```

Тоді у правилах: `request.auth.token.admin == true`.

## Структура

| Файл | Призначення |
| --- | --- |
| `index.html` | весь застосунок (UI, боти, чат, голос, адмін-панель) |
| `firebase-config.js` | конфіг Firebase (заповнити після створення проєкту) |
| `firestore.rules` | правила безпеки Firestore (адмін = email у правилі) |
| `README.md` | ця інструкція |

## Дані й приватність

- Історія, обране й налаштування зберігаються локально (localStorage) — тільки на пристрої.
- Мікрофон запитується лише після натискання кнопки мікрофона; аудіо не записується у файл і нікуди не передається (розпізнавання — Web Speech API у браузері).
- Після входу через Google у Firestore зберігається лише ім'я, email, фото та час останнього входу.

## Розгортання

Статичний хостинг: GitHub Pages, Netlify, Vercel — поклади файли у репозиторій і увімкни Pages. Після цього додай домен у Firebase → Authentication → Authorized domains.

/* ============================================================
   GlassChat — Firebase configuration
   ============================================================
   Цей файл НЕ містить секретів: apiKey Firebase — це публічний
   ідентифікатор проєкту, безпечний для клієнта.
   Права доступу контролюються Firestore Security Rules.

   ЩО ЗРОБИТИ:
   1. Створи проєкт на https://console.firebase.google.com
   2. Увімкни Authentication → Sign-in method → Google
   3. Створи Firestore Database (production mode)
   4. Project settings → Your apps → Web app → скопіюй конфіг
   5. Встав значення нижче (заміни рядки "...")
   6. Опублікуй firestore.rules у консолі Firestore → Rules
   7. Authentication → Settings → Authorized domains:
      додай домен сайту (наприклад, tomnukoleksandr94-gif.github.io)

   Поки конфіг не заповнений, GlassChat працює в режимі гостя:
   чат-рулетка доступна, вхід через Google — з повідомленням,
   що Firebase ще не підключено (жодних фальшивих функцій).
   ============================================================ */

window.FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

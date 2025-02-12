document.addEventListener('DOMContentLoaded', () => {
    // Инициализация администратора (только при первом запуске)
    if (!localStorage.getItem('admin')) {
        const admin = {
            username: 'admin',
            password: 'admin123'
        };
        localStorage.setItem('admin', JSON.stringify(admin));
    }

    // Обработка регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Получение и очистка данных
            const [name, email, password] = [...e.target.elements]
                .slice(0, 3)
                .map(input => input.value.trim());

            // Валидация
            if (!name || !email || !password) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Введите корректный email');
                return;
            }
            
            if (password.length < 6) {
                alert('Пароль должен быть не менее 6 символов');
                return;
            }

            // Сохранение пользователя
            localStorage.setItem('user', JSON.stringify({
                name,
                email,
                password
            }));
            
            alert('Регистрация успешна!');
            window.location.href = 'web5(3).html'; // Перенаправление на логин
        });
    }

    // Обработка входа
    const loginForm = document.getElementById('teacherLogin');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Получение данных
            const [login, password] = [...e.target.elements]
                .slice(0, 2)
                .map(input => input.value.trim());

            // Базовые проверки
            if (!login || !password) {
                alert('Заполните все поля');
                return;
            }

            const storedAdmin = JSON.parse(localStorage.getItem('admin'));
            const storedUser = JSON.parse(localStorage.getItem('user'));

            // Проверка администратора
            if (storedAdmin?.username === login && storedAdmin?.password === password) {
                sessionStorage.setItem('auth', JSON.stringify({
                    role: 'admin',
                    login: storedAdmin.username
                }));
                window.location.href = 'web5(4).html';
                return;
            }

            // Проверка пользователя
            if (storedUser?.email === login && storedUser?.password === password) {
                sessionStorage.setItem('auth', JSON.stringify({
                    role: 'user',
                    name: storedUser.name,
                    email: storedUser.email
                }));
                window.location.href = 'web5(3.1).html';
                return;
            }

            // Неудачная попытка
            alert('Неверные учетные данные');
        });
    }
});
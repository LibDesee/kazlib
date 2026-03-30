export type Language = 'en' | 'ru';

export const dictionary = {
    en: {
        nav: {
            home: "Home",
            roadmap: "Roadmap",
            unis: "Unis",
            personality: "Personality",
            grades: "Grades",
            school: "School",
            social: "Social",
            profile: "Profile",
            settings: "Settings",
            logout: "Sign Out",
        },
        landing: {
            heroTag: "The Future of Student Education",
            heroTitlePrefix: "KazLib —",
            heroTitleSuffix: "Будущее учеников",
            heroDescription: "Your all-in-one ecosystem for academic success, career planning, and student life in Kazakhstan.",
            getStarted: "Get Started",
            learnMore: "Learn More",
            features: {
                roadmap: {
                    title: "AI RoadMap",
                    desc: "Build your future with AI-driven career paths."
                },
                unis: {
                    title: "University Hub",
                    desc: "Find your dream university locally or abroad."
                },
                personality: {
                    title: "Personality Test",
                    desc: "Discover your strengths and ideal career matches."
                },
                grades: {
                    title: "Grades Polygon",
                    desc: "Calculate and predict your term grades instantly."
                },
                school: {
                    title: "School Ecosystem",
                    desc: "Schedules, canteen menu, and student search."
                },
                social: {
                    title: "Social Hub",
                    desc: "Connect with peers and share your journey."
                }
            }
        },
        grades: {
            title: "My Grades",
            viewMode: "View Grades",
            calcMode: "Calculator",
            subject: "Subject",
            term: "Term",
            overall: "Overall KPI",
            assignments: "Assignments",
            attendance: "Attendance",
            formative: "Formative (FA)",
            sor: "SAS",
            soch: "SAT",
            final: "Final",
            calculate: "Calculate Grade",
            addGrade: "Add Grade",
        },
        social: {
            search: "Search messages...",
            online: "Online",
            typeMessage: "Type a message...",
        },
        school: {
            title: "School Ecosystem",
            subtitle: "Find your perfect academic destination.",
            schedule: "Schedule",
            canteen: "Canteen",
            findUsers: "Find Users",
            todaysClasses: "Today's Classes",
            eventsCalendar: "Events Calendar",
            searchPlaceholder: "Search for students or teachers...",
            noUsersFound: "No users found.",
            student: "Student",
            teacher: "Teacher",
            days: {
                mon: "M",
                tue: "T",
                wed: "W",
                thu: "T",
                fri: "F",
                sat: "S",
                sun: "S"
            }
        },
        universities: {
            title: "University Hub",
            subtitle: "Find your perfect academic destination.",
            localTab: "Kazakhstan (UNT)",
            internationalTab: "International",
            subject1: "Subject 1",
            subject2: "Subject 2",
            untScore: "UNT Score",
            calculateChances: "Calculate Chances",
            chance: "Chance",
            grant: "Grant",
            paid: "Paid",
            worldRank: "World Rank",
            details: "Details",
            about: "About",
            tuition: "Tuition",
            ranking: "Ranking",
            visitWebsite: "Visit Website",
            local: "Local",
            filters: {
                top100: "Top 100",
                top300: "Top 300",
                top500: "Top 500",
                scholarships: "Scholarships",
                usa: "USA",
                uk: "UK",
                europe: "Europe"
            }
        },
        profile: {
            title: "My Profile",
            name: "Full Name",
            grade: "Grade / Class",
            school: "School",
            interests: "Interests",
            save: "Save Changes",
        },
        common: {
            loading: "Loading...",
            back: "Back",
        },
        news: {
            title: "News & Events",
            readMore: "Read more",
            close: "Close"
        },
        prediction: {
            title: "Admission Chance Prediction",
            high: "High",
            medium: "Medium",
            low: "Low",
            veryHigh: "Very High",
            message: "Your chance of admission is {percent}%"
        }
    },
    ru: {
        nav: {
            home: "Главная",
            roadmap: "План",
            unis: "ВУЗы",
            personality: "Личность",
            grades: "Оценки",
            school: "Школа",
            social: "Социальная",
            profile: "Профиль",
            settings: "Настройки",
            logout: "Выйти",
        },
        landing: {
            heroTag: "Будущее учеников",
            heroTitlePrefix: "KazLib —",
            heroTitleSuffix: "Будущее учеников",
            heroDescription: "Ваша единая экосистема для академического успеха, планирования карьеры и студенческой жизни в Казахстане.",
            getStarted: "Начать",
            learnMore: "Подробнее",
            features: {
                roadmap: {
                    title: "AI План",
                    desc: "Построй свое будущее с карьерными путями на основе ИИ."
                },
                unis: {
                    title: "Центр ВУЗов",
                    desc: "Найди университет мечты внутри страны или за рубежом."
                },
                personality: {
                    title: "Тест Личности",
                    desc: "Раскрой свои сильные стороны и идеальные профессии."
                },
                grades: {
                    title: "Полигон Оценок",
                    desc: "Рассчитай и спрогнозируй свои четвертные оценки мгновенно."
                },
                school: {
                    title: "Школьная Экосистема",
                    desc: "Расписание, меню столовой и поиск учеников."
                },
                social: {
                    title: "Социальный Хаб",
                    desc: "Общайся со сверстниками и делись своим путем."
                }
            }
        },
        grades: {
            title: "Мои Оценки",
            viewMode: "Просмотр",
            calcMode: "Калькулятор",
            subject: "Предмет",
            term: "Четверть",
            overall: "Общий KPI",
            assignments: "Задания",
            attendance: "Посещаемость",
            formative: "ФО",
            sor: "СОР",
            soch: "СОЧ",
            final: "Итоговая",
            calculate: "Рассчитать",
            addGrade: "Добавить",
        },
        social: {
            search: "Поиск сообщений...",
            online: "В сети",
            typeMessage: "Введите сообщение...",
        },
        school: {
            title: "Школьная Экосистема",
            subtitle: "Найди свое идеальное академическое направление.",
            schedule: "Расписание",
            canteen: "Столовая",
            findUsers: "Поиск Людей",
            todaysClasses: "Сегодняшние Уроки",
            eventsCalendar: "Календарь Событий",
            searchPlaceholder: "Поиск учеников или учителей...",
            noUsersFound: "Пользователи не найдены.",
            student: "Ученик",
            teacher: "Учитель",
            days: {
                mon: "Пн",
                tue: "Вт",
                wed: "Ср",
                thu: "Чт",
                fri: "Пт",
                sat: "Сб",
                sun: "Вс"
            }
        },
        universities: {
            title: "Центр ВУЗов",
            subtitle: "Найди свой идеальный университет.",
            localTab: "Казахстан (ЕНТ)",
            internationalTab: "Международные",
            subject1: "Предмет 1",
            subject2: "Предмет 2",
            untScore: "Балл ЕНТ",
            calculateChances: "Рассчитать Шансы",
            chance: "Шанс",
            grant: "Грант",
            paid: "Платное",
            worldRank: "Мировой Рейтинг",
            details: "Подробнее",
            about: "О ВУЗе",
            tuition: "Стоимость",
            ranking: "Рейтинг",
            visitWebsite: "Посетить Сайт",
            local: "Местный",
            filters: {
                top100: "Топ 100",
                top300: "Топ 300",
                top500: "Топ 500",
                scholarships: "Стипендии",
                usa: "США",
                uk: "Великобритания",
                europe: "Европа"
            }
        },
        profile: {
            title: "Мой Профиль",
            name: "ФИО",
            grade: "Класс",
            school: "Школа",
            interests: "Интересы",
            save: "Сохранить",
        },
        common: {
            loading: "Загрузка...",
            back: "Назад",
        },
        news: {
            title: "Новости и События",
            readMore: "Читать далее",
            close: "Закрыть"
        },
        prediction: {
            title: "Анализ шансов поступления",
            high: "Высокий",
            medium: "Средний",
            low: "Низкий",
            veryHigh: "Очень высокий",
            message: "Ваш шанс на поступление составляет {percent}%"
        }
    }
};

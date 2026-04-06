export const PERSONALITY_QUESTIONS = [
    {
        id: 1,
        question: {
            ru: "Как вы предпочитаете решать проблемы?",
            en: "How do you prefer to solve problems?"
        },
        options: [
            { id: "a", text: { ru: "Анализ данных и логика", en: "Data analysis and logic" }, type: "tech" },
            { id: "b", text: { ru: "Обсуждение с другими", en: "Discussing with others" }, type: "social" },
            { id: "c", text: { ru: "Создание чего-то визуального", en: "Creating something visual" }, type: "creative" },
            { id: "d", text: { ru: "Практические эксперименты", en: "Hands-on experiments" }, type: "science" },
        ],
    },
    {
        id: 2,
        question: {
            ru: "Какой ваш любимый школьный предмет?",
            en: "What is your favorite school subject?"
        },
        options: [
            { id: "a", text: { ru: "Математика / Информатика", en: "Math / Computer Science" }, type: "tech" },
            { id: "b", text: { ru: "Литература / История", en: "Literature / History" }, type: "social" },
            { id: "c", text: { ru: "Искусство / Дизайн", en: "Art / Design" }, type: "creative" },
            { id: "d", text: { ru: "Физика / Биология", en: "Physics / Biology" }, type: "science" },
        ],
    },
    {
        id: 3,
        question: {
            ru: "В групповом проекте вы обычно...",
            en: "In a group project, you are usually..."
        },
        options: [
            { id: "a", text: { ru: "Организатор / Лидер", en: "Organizer / Leader" }, type: "social" },
            { id: "b", text: { ru: "Программист / Инженер", en: "Programmer / Engineer" }, type: "tech" },
            { id: "c", text: { ru: "Дизайнер / Презентатор", en: "Designer / Presenter" }, type: "creative" },
            { id: "d", text: { ru: "Исследователь", en: "Researcher" }, type: "science" },
        ],
    },
    {
        id: 4,
        question: {
            ru: "Что вас больше всего привлекает в свободное время?",
            en: "What attracts you most in your free time?"
        },
        options: [
            { id: "a", text: { ru: "Написание кода / игры", en: "Coding / Gaming" }, type: "tech" },
            { id: "b", text: { ru: "Встречи с друзьями / Волонтерство", en: "Meeting friends / Volunteering" }, type: "social" },
            { id: "c", text: { ru: "Рисование / Музыка / Видео", en: "Drawing / Music / Video" }, type: "creative" },
            { id: "d", text: { ru: "Чтение научных статей / Документалки", en: "Reading science articles / Documentaries" }, type: "science" },
        ],
    },
    {
        id: 5,
        question: {
            ru: "Какая из этих ролей вам ближе?",
            en: "Which of these roles is closer to you?"
        },
        options: [
            { id: "a", text: { ru: "Архитектор систем", en: "Systems Architect" }, type: "tech" },
            { id: "b", text: { ru: "Психолог команды", en: "Team Psychologist" }, type: "social" },
            { id: "c", text: { ru: "Генератор идей", en: "Idea Generator" }, type: "creative" },
            { id: "d", text: { ru: "Открыватель нового", en: "Discoverer" }, type: "science" },
        ],
    },
    {
        id: 6,
        question: {
            ru: "Как вы относитесь к правилам?",
            en: "How do you feel about rules?"
        },
        options: [
            { id: "a", text: { ru: "Использую их как фреймворк", en: "Use them as a framework" }, type: "tech" },
            { id: "b", text: { ru: "Адаптирую под нужды людей", en: "Adapt them to people's needs" }, type: "social" },
            { id: "c", text: { ru: "Предпочитаю их нарушать", en: "Prefer to break them" }, type: "creative" },
            { id: "d", text: { ru: "Изучаю причину их возникновения", en: "Study the reason for their existence" }, type: "science" },
        ],
    },
    {
        id: 7,
        question: {
            ru: "Что бы вы выбрали для просмотра?",
            en: "What would you choose to watch?"
        },
        options: [
            { id: "a", text: { ru: "Обзор новых гаджетов/технологий", en: "Review of new gadgets/tech" }, type: "tech" },
            { id: "b", text: { ru: "Драматический сериал", en: "Drama series" }, type: "social" },
            { id: "c", text: { ru: "Арт-хаус / Фестивальное кино", en: "Art-house / Festival movie" }, type: "creative" },
            { id: "d", text: { ru: "National Geographic/Discovery", en: "National Geographic/Discovery" }, type: "science" },
        ],
    },
    {
        id: 8,
        question: {
            ru: "При покупке новой вещи, что для вас важнее?",
            en: "When buying a new item, what is most important to you?"
        },
        options: [
            { id: "a", text: { ru: "Характеристики и функционал", en: "Specs and functionality" }, type: "tech" },
            { id: "b", text: { ru: "Бренд и статус", en: "Brand and status" }, type: "social" },
            { id: "c", text: { ru: "Уникальный дизайн", en: "Unique design" }, type: "creative" },
            { id: "d", text: { ru: "Материалы и экологичность", en: "Materials and eco-friendliness" }, type: "science" },
        ],
    },
    {
        id: 9,
        question: {
            ru: "Ваш идеальный рабочий день включает...",
            en: "Your ideal workday includes..."
        },
        options: [
            { id: "a", text: { ru: "Решение сложных алгоритмов", en: "Solving complex algorithms" }, type: "tech" },
            { id: "b", text: { ru: "Общение с клиентами", en: "Communicating with clients" }, type: "social" },
            { id: "c", text: { ru: "Мозговой штурм креативов", en: "Brainstorming creatives" }, type: "creative" },
            { id: "d", text: { ru: "Работу в лаборатории", en: "Working in a lab" }, type: "science" },
        ],
    },
    {
        id: 10,
        question: {
            ru: "Какая новость вас заинтересует больше всего?",
            en: "What news would interest you the most?"
        },
        options: [
            { id: "a", text: { ru: "Презентация нового AI", en: "Presentation of a new AI" }, type: "tech" },
            { id: "b", text: { ru: "Политическое событие / Общество", en: "Political event / Society" }, type: "social" },
            { id: "c", text: { ru: "Открытие новой выставки", en: "Opening of a new exhibition" }, type: "creative" },
            { id: "d", text: { ru: "Открытие новой планеты", en: "Discovery of a new planet" }, type: "science" },
        ],
    },
    {
        id: 11,
        question: {
            ru: "Вы лучше всего усваиваете информацию, когда...",
            en: "You learn best when..."
        },
        options: [
            { id: "a", text: { ru: "Строите блок-схемы", en: "Building flowcharts" }, type: "tech" },
            { id: "b", text: { ru: "Слушаете лекцию/Подкаст", en: "Listening to a lecture/Podcast" }, type: "social" },
            { id: "c", text: { ru: "Смотрите картинки/инфографику", en: "Looking at pictures/infographics" }, type: "creative" },
            { id: "d", text: { ru: "Проводите опыты", en: "Conducting experiments" }, type: "science" },
        ],
    },
    {
        id: 12,
        question: {
            ru: "Как вы планируете отпуск?",
            en: "How do you plan a vacation?"
        },
        options: [
            { id: "a", text: { ru: "Всё в таблице (Excel/Notion)", en: "Everything in a spreadsheet (Excel/Notion)" }, type: "tech" },
            { id: "b", text: { ru: "Советуюсь с местными/друзьями", en: "Consult with locals/friends" }, type: "social" },
            { id: "c", text: { ru: "Ищу самые красивые виды (Pinterest)", en: "Looking for the most beautiful views (Pinterest)" }, type: "creative" },
            { id: "d", text: { ru: "Изучаю историю и географию места", en: "Study the history and geography of the place" }, type: "science" },
        ],
    },
    {
        id: 13,
        question: {
            ru: "Что для вас самое важное в карьере?",
            en: "What is most important to you in a career?"
        },
        options: [
            { id: "a", text: { ru: "Автоматизация и эффективность", en: "Automation and efficiency" }, type: "tech" },
            { id: "b", text: { ru: "Помощь людям", en: "Helping people" }, type: "social" },
            { id: "c", text: { ru: "Свобода самовыражения", en: "Freedom of self-expression" }, type: "creative" },
            { id: "d", text: { ru: "Поиск истины", en: "Search for truth" }, type: "science" },
        ],
    },
    {
        id: 14,
        question: {
            ru: "Вам подарили конструктор. Вы...",
            en: "You were given a construction set. You..."
        },
        options: [
            { id: "a", text: { ru: "Собираете строго по инструкции", en: "Assemble strictly according to instructions" }, type: "tech" },
            { id: "b", text: { ru: "Собираете вместе с друзьями", en: "Assemble together with friends" }, type: "social" },
            { id: "c", text: { ru: "Строите что-то своё, уникальное", en: "Build something of your own, unique" }, type: "creative" },
            { id: "d", text: { ru: "Изучаете механику деталей", en: "Study the mechanics of the parts" }, type: "science" },
        ],
    },
    {
        id: 15,
        question: {
            ru: "В конфликтной ситуации вы...",
            en: "In a conflict situation, you..."
        },
        options: [
            { id: "a", text: { ru: "Ищете компромисс через логику", en: "Seek compromise through logic" }, type: "tech" },
            { id: "b", text: { ru: "Стараетесь понять чувства других", en: "Try to understand others' feelings" }, type: "social" },
            { id: "c", text: { ru: "Сглаживаете углы юмором", en: "Smooth things over with humor" }, type: "creative" },
            { id: "d", text: { ru: "Анализируете причину конфликта", en: "Analyze the cause of the conflict" }, type: "science" },
        ],
    },
    {
        id: 16,
        question: {
            ru: "Какой суперспособностью вы хотели бы обладать?",
            en: "What superpower would you like to have?"
        },
        options: [
            { id: "a", text: { ru: "Киберпатия (управление техникой)", en: "Cyberpathy (control technology)" }, type: "tech" },
            { id: "b", text: { ru: "Чтение мыслей", en: "Mind reading" }, type: "social" },
            { id: "c", text: { ru: "Создание иллюзий", en: "Illusion casting" }, type: "creative" },
            { id: "d", text: { ru: "Управление временем", en: "Time manipulation" }, type: "science" },
        ],
    },
    {
        id: 17,
        question: {
            ru: "Ваша комната это...",
            en: "Your room is..."
        },
        options: [
            { id: "a", text: { ru: "Умный дом с гаджетами", en: "A smart home with gadgets" }, type: "tech" },
            { id: "b", text: { ru: "Место для посиделок", en: "A place for hangouts" }, type: "social" },
            { id: "c", text: { ru: "Арт-студия / Творческий хаос", en: "Art studio / Creative chaos" }, type: "creative" },
            { id: "d", text: { ru: "Мини-лаборатория / Библиотека", en: "Mini lab / Library" }, type: "science" },
        ],
    },
    {
        id: 18,
        question: {
            ru: "Какая игра вам нравится больше?",
            en: "Which game do you like more?"
        },
        options: [
            { id: "a", text: { ru: "Стратегия / Головоломка", en: "Strategy / Puzzle" }, type: "tech" },
            { id: "b", text: { ru: "Командная / Настольная с семьей", en: "Team-based / Board game with family" }, type: "social" },
            { id: "c", text: { ru: "Песочница (Sims, Minecraft)", en: "Sandbox (Sims, Minecraft)" }, type: "creative" },
            { id: "d", text: { ru: "Симуляторы", en: "Simulators" }, type: "science" },
        ],
    },
    {
        id: 19,
        question: {
            ru: "Как вы описываете свой стиль в одежде?",
            en: "How do you describe your clothing style?"
        },
        options: [
            { id: "a", text: { ru: "Функциональный и удобный", en: "Functional and comfortable" }, type: "tech" },
            { id: "b", text: { ru: "Стильный, в тренде", en: "Stylish, trendy" }, type: "social" },
            { id: "c", text: { ru: "Яркий, необычный", en: "Bright, unusual" }, type: "creative" },
            { id: "d", text: { ru: "Классический, минимализм", en: "Classic, minimalistic" }, type: "science" },
        ],
    },
    {
        id: 20,
        question: {
            ru: "Какая цитата вам ближе?",
            en: "Which quote is closer to you?"
        },
        options: [
            { id: "a", text: { ru: "«Программы должны писаться для людей»", en: "«Programs must be written for people to read»" }, type: "tech" },
            { id: "b", text: { ru: "«Единственная настоящая роскошь — это роскошь человеческого общения»", en: "«The only true luxury is the luxury of human communication»" }, type: "social" },
            { id: "c", text: { ru: "«Творчество — это интеллект, который веселится»", en: "«Creativity is intelligence having fun»" }, type: "creative" },
            { id: "d", text: { ru: "«Важно не переставать задавать вопросы»", en: "«The important thing is not to stop questioning»" }, type: "science" },
        ],
    },
];

export const PERSONALITY_RESULTS = {
    tech: {
        title: {
            ru: "Инноватор (IT)",
            en: "Innovator (IT)"
        },
        desc: {
            ru: "Вы мыслите структурно, любите логику и системы. Ваша страсть — создание будущего с помощью технологий и алгоритмов.",
            en: "You think structurally, love logic and systems. Your passion is creating the future using technology and algorithms."
        },
        careers: {
            ru: ["Программный инженер", "Data Scientist", "Специалист по кибербезопасности", "Системный администратор", "AI-разработчик"],
            en: ["Software Engineer", "Data Scientist", "Cybersecurity Specialist", "System Administrator", "AI Developer"]
        }
    },
    social: {
        title: {
            ru: "Связующее звено (Социальное)",
            en: "Connector (Social)"
        },
        desc: {
            ru: "Вы отлично понимаете эмоции и мотивы людей. Вы — прирожденный лидер и коммуникатор, способный сплотить команду.",
            en: "You perfectly understand people's emotions and motives. You are a natural leader and communicator capable of uniting a team."
        },
        careers: {
            ru: ["Психолог", "HR-директор", "PR-менеджер", "Преподаватель", "Дипломат"],
            en: ["Psychologist", "HR Director", "PR Manager", "Teacher", "Diplomat"]
        }
    },
    creative: {
        title: {
            ru: "Творец (Искусство)",
            en: "Creator (Arts)"
        },
        desc: {
            ru: "У вас живое воображение, идеальное чувство эстетики и огромный потенциал менять мир через дизайн и искусство.",
            en: "You have a vivid imagination, a perfect sense of aesthetics, and great potential to change the world through design and art."
        },
        careers: {
            ru: ["UX/UI дизайнер", "Архитектор", "Арт-директор", "Режиссер", "Графический дизайнер"],
            en: ["UX/UI Designer", "Architect", "Art Director", "Film Director", "Graphic Designer"]
        }
    },
    science: {
        title: {
            ru: "Исследователь (Наука)",
            en: "Explorer (Science)"
        },
        desc: {
            ru: "Вами движет любопытство. Вам интересно докопаться до сути вещей, проводить опыты и делать новые открытия.",
            en: "You are driven by curiosity. You are interested in getting to the bottom of things, conducting experiments, and making discoveries."
        },
        careers: {
            ru: ["Биотехнолог", "Ученый-исследователь", "Врач / Хирург", "Астрофизик", "Нейробиолог"],
            en: ["Biotechnologist", "Research Scientist", "Doctor / Surgeon", "Astrophysicist", "Neurobiologist"]
        }
    }
};

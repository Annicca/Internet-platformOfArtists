
export let header = [
    {
        title: 'Вход',
        link: '/login',
    },
    {
        title: 'Регистрация',
        link: 'signin',
    },
    {
        title: 'Разместить коллектив и конкурс',
        link: '/statement',
    }
];

export let navMenuButton = [
    // {
    //     title: 'Атрибутика',
    //     link: ''
    // },
    // {
    //     title: 'Услуги',
    //     link: ''
    // },

    {
        title: 'Коллективы',
        link: '/'
    },
    {
        title: 'Конкурсы',
        link: '/competitions'
    }
];

export let tabletitle  = ['Логин', 'ФИО', 'Почта','Телефон','Подробнее','Удалить'];
export let tableUsersImg = [
    {
        src: '/icons/podrobnee.svg',
        alt: 'Подробнее',
    },

    {
        src: '/icons/edit.svg',
        alt: 'Изменить',
    },

    {
        src: '/icons/del.svg',
        alt: 'Удалить',
    }
];

export let footerList = [
    {
        title: 'Разместить коллектив',
        link: '/statement'
    },
    {
        title: 'Разместить конкурс',
        link: '/statement'
    },
    // {
    //     title: 'Продавай вместе с нами',
    //     link: ''
    // },
    // {
    //     title: 'Атрибутика',
    //     link: ''
    // },
    // {
    //     title: 'Услуги',
    //     link: ''
    // },
    {
        title: 'Конкурсы' ,
        link: '/competitions'
    },
    {
        title: 'Коллективы',
        link: '/'
    }
];

export let socials = [
    {
        src: '/icons/youtube.svg',
        alt: 'Youtube',
        link: 'https://www.youtube.com/'
    },

    {
        src: '/icons/telega.svg',
        alt: 'Telegram',
        link: 'https://web.telegram.org/'
    },

    {
        src: '/icons/inst.svg',
        alt: 'Instagram',
        link: 'https://www.instagram.com/'
    },
    {
        src: '/icons/vk.svg',
        alt: 'Vk',
        link: 'https://vk.com/',
    }
];

export let inputTitle = ['ID','Привилегии', 'Фамилия', 'Имя', 'Отчество', 'Логин', 'Почта']
export let roles = [
    {
        idRole: 1,
        name: 'Администратор'
    },
    {
        idRole: 2,
        name: 'Клиент'
    },
    {
        idRole: 3,
        name: 'Руководитель коллектива'
    },
    {
        idRole: 4,
        name: 'Организатор конкурсов'
    }
];

export const listUserWindow = [
    // {
    //     title: 'Личный кабинет',
    //     link: '/accaunt'
    // },
    {
        title: 'Moи коллективы',
        link: '/mygroups'
    },
    {
        title: 'Moи конкурсы',
        link: '/mycompetitions'
    },
    {
        title: 'Moи заявки',
        link: '/mystatements'
    },
]

export const listAdminWindow = [
    // {
    //     title: 'Личный кабинет',
    //     link: '/accaunt'
    // },
    {
        title: 'Пользователи',
        link: '/users'
    },
    {
        title: 'Заявки о размещении',
        link: ''
    }
];

export const groupForm = ['Название:', 'Стиль:', 'Город:', 'Адрес:', 'Описание:'];
export const competitionForm = ['Название', 'Дата начала', 'Дата окончания', 'Город', 'О конкурсе'];
export const participantTitle = ['Название','Адрес', 'Руководитель', 'Телефон', 'Email'];
export const statementGroup = ['Название:', 'Город:', 'Адрес:', 'Описание:'];
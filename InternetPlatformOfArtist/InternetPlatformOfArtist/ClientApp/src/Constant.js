export const urlSrc = 'https://localhost:44344';
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

export let inputTitle = ['ID','Привилегии', 'Фамилия', 'Имя', 'Отчество', 'Логин', 'Почта', "Телефон"]
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

export const listClientWindow = [
    {
        title: 'Moи заявки',
        link: '/mystatements'
    },
];
export const listDirectorWindow = [
    {
        title: 'Moи коллективы',
        link: '/mygroups'
    },
    {
        title: 'Moи заявки',
        link: '/mystatements'
    },
];


export const listOrganizerWindow = [
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
    {
        title: 'Пользователи',
        link: '/users'
    },
    {
        title: 'Заявки о размещении',
        link: '/statements'
    }
];

export const groupForm = ['Название:', 'Стиль:', 'Город:', 'Адрес:', 'Описание:'];
export const competitionForm = ['Название', 'Дата начала', 'Дата окончания', 'Город', 'О конкурсе'];
export const participantTitle = ['Название','Адрес', 'Руководитель', 'Телефон', 'Email'];
export const statementGroup = ['Название:', 'Город:', 'Адрес:', 'Описание:'];
export const tablestatement = ['№','Пользователь', 'Тип', 'Название', 'Город', 'Подробнее', 'Принять', 'Отклонить' ];
export const detailGroup = ['Пользователь', 'Почта', 'Название', 'Город', 'Адрес'];
export const detailCompetition = ['Пользователь', 'Почта', 'Название', 'Город', 'Дата начала', 'Дата окончания'];
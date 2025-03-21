const ru = {
  translation: {
    modal: {
      nameChannel: "Название канала",
      addChannel: "Добавить канал",
      cancelButton: "Отменить",
      submit: "Отправить",
      removeChannel: "Удалить канал",
      confirmText: "Вы уверены?",
      removeButton: "Удалить",
      renameChannel: "Переименовать канал",
    },
    channel: {
      addChannelPending: "Создание канала...",
      addChannelFulfilled: "Канал создан",
      addChannelRejected: "Ошибка при создании канала",
      removeChannelPending: "Удаление канала...",
      removeChannelFulfilled: "Канал удален",
      removeChannelRejected: "Ошибка при удалении канала",
      renameChannelPending: "Переименование канала...",
      renameChannelFulfilled: "Канал переименован",
      renameChannelRejected: "Ошибка при переименовании канала",
    },
    validation: {
      required: "Обязательное поле",
      signup: {
        passwordLength: "Не менее 6 символов",
        repeatPassword: "Подтвердите пароль",
        notConfirmPassword: "Пароли должны совпадать",
        signUpBtn: "Зарегистрироваться",
        nameLength: "От 3 до 20 символов",
      },
      channelsValidation: {
        duplicate: "Канал с таким именем уже существует",
        length: "От 3 до 20 символов",
        profanity: "Так себе название",
      },
    },
    forms: {
      registrationTitle: "Регистрация",
      registrationName: "Имя пользователя",
      password: "Пароль",
      confirmPassword: "Подтвердите пароль",
      registrationButton: "Зарегистрироваться",
      authTitle: "Войти",
      authButton: "Войти",
      authName: "Ваш ник",
      signup: "Регистрация",
      notAccount: "Нет аккаунта?",
    },
    errors: {
      401: "Неверные имя пользователя или пароль",
      409: "Tакой пользователь уже существует",
      500: "Сервер не доступен, попробуйте позже ",
      default: "Что-то пошло не так...",
    },
    notFoundPage: {
      notFound:'Страница не найдена',
      goTo: 'Но вы можете перейти',
      link: 'на главную страницу'
    },
    chatPage: {
      delete: 'Удалить',
      rename: 'Переименовать',
      channelContol: 'Управление каналом',
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
      channels: 'Каналы',
      placeholder: 'Введите сообщение...',
      newMessage: 'Новое сообщение',
      submit: "Отправить",
    },
  },
};

export default ru;

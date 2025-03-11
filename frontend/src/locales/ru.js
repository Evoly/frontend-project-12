import channels from "@hexlet/chat-server/src/routes/channels";

const ru = {
  translation: {
    modal: {
      nameChannel: 'Название канала',
      addChannel: 'Добавить канал',
      cancelButton: 'Отменить',
      submit: 'Отправить',
      removeChannel: 'Удалить канал',
      confirmText: 'Вы уверены?',
      removeButton: 'Удалить',
      renameChannel: 'Переименовать канал',
    },
    channelsValidation: {
      duplicate: 'Канал с таким именем уже существует',
      length: 'От 3 до 20 символов',
    },
    validation: {
      required: 'Обязательное поле',
    }
  },
};

export default ru;
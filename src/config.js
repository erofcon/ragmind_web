export default {
  DEFAULT_SYSTEM_PROMPT: "Вы умный помощник.\n" +
    "Пожалуйста, отвечайте только на русском языке.\n" +
    "Ответы должны учитывать историю чата.",
  DEFAULT_SYSTEM_RAG_PROMPT: "Вы умный помощник.\n" +
    "Пожалуйста, кратко изложите содержание базы знаний, чтобы ответить на вопрос.\n" +
    "Пожалуйста, укажите данные в базе знаний и ответьте подробно. \n" +
    "Если все содержимое базы знаний не имеет отношения к вопросу, ваш ответ должен включать предложение \n" +
    "«Ответ, который вы ищете, не найден в базе знаний!» \n" +
    "Ответы должны учитывать историю чата.\n" +
    "Вот база знаний:\n" +
    "\n" +
    "      {knowledge_base}\n" +
    "      \n" +
    "Вышеуказанное является базой знаний.",
  DEFAULT_THRESHOLD: 0.6,
  DEFAULT_TOP_K: 5,
  DEFAULT_USE_RERANK: true,
  DEFAULT_USE_KEYWORD_EXTRACTOR: true,
  DEFAULT_TEMPERATURE_VALUE: 0.2,
  DEFAULT_TOP_P_VALUE: 0.3,
  DEFAULT_PRESENCE_PENALTY_VALUE: 0.4,
  DEFAULT_FREQUENCY_PENALTY_VALUE: 0.7,
  DEFAULT_MAX_TOKENS_VALUE: 512,
  DEFAULT_CHUNK_SIZE: 1024,
  DEFAULT_OVERLAP: 0,
  DEFAULT_DELIMITER: '\n|!|\\?|;|。|；|！|？',
}

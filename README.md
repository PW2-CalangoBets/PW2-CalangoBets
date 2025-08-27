# 🎰 CalangoBets — O Lado Sombrio das Apostas

**CalangoBets** é uma aplicação construída com o objetivo de **alertar e conscientizar** sobre os riscos e prejuízos das apostas. Embora o projeto simule uma plataforma de apostas, seu real propósito é educativo: mostrar que a casa sempre vence — e você sempre perde :(.

---

## 🚫 Por que este projeto?

Atualmente, sites de apostas estão cada vez mais presentes na internet e infelizmente no cotidiano das pessoas, atraindo usuários com promessas de ganhos fáceis e rápidos. Dessa forma, o CalangoBets surge como uma crítica direta a esse sistema, demonstrando por meio da experiência de uso o quão **manipulador e perigoso** esse universo pode ser.

---

## 🔧 Tecnologias Utilizadas

- ⚛️ React (Vite)
- 🔥 Firebase (Auth, Firestore, Hosting)

---

## 🧪 Instalação e Execução Local

### 1. Clone o repositório

```bash
git clone https://github.com/PW2-CalangoBets/PW2-CalangoBets.git
cd PW2-CalangoBets
```

### 2. Configure as variáveis de ambiente

Para rodar essa aplicação você precisa do back-end da calangoBets rodando em paralelo, para isso siga os passos de instalação da API, que está na seguinte url https://github.com/PW2-CalangoBets/CalangoBets-Backend.git
Além disso, configure a url em que a API está rodando, no arquivo axios, contendo a url, que normalmente será locahost:8080

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

```bash
npm run dev
```

---

## 🔬 Testes

### 1. Instalacao Browser

Para os testes de integração além das dependências instaladas anteriormente é preciso ter um navegador com suporte ao playwright. Isso pode ser feito rodando o script:

```bash
npm run install-playwright
```

### 2. Executar os Testes

Abaixo estão os scripts disponíveis para executar os testes do projeto:

- **`unit-test`**: executa apenas os testes unitários (usando Jest)
- **`integration-test`**: executa apenas os testes de integração (usando Playwright)
- **`test`**: executa ambos os testes (unitários e de integração)

```bash
npm run unit-test
npm run integration-test
npm run test
```

---

## 💡 Funcionalidades

- Cadastro e login de usuários (Firebase Auth)
- Interface semelhante a sites reais de apostas
- Simulações viciantes com feedback enganoso
- Alertas sobre perdas e armadilhas
- Mensagens educativas contra o vício

---

## 🚨 Aviso importante

Este projeto **não promove apostas reais**. Qualquer semelhança com casas de apostas é intencional para fins didáticos e críticos. O intuito é **expor os danos psicológicos, financeiros e sociais, dãã** provocados por esse tipo de sistema.


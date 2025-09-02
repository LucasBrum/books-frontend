# 📚 Books Frontend - Sistema de Gerenciamento de Biblioteca

Uma aplicação Angular 18 moderna e completa para gerenciar livros, autores e gêneros, integrada com a **Books API**. Desenvolvida seguindo as melhores práticas do Angular com arquitetura standalone components, NgRx para gerenciamento de estado e Angular Material para design.

## 🚀 Funcionalidades

### ✅ **Funcionalidades Implementadas**

#### 🔐 **Autenticação**
- **Login/Logout**: Sistema completo com JWT
- **Registro**: Cadastro de novos usuários
- **Guards**: Proteção de rotas autenticadas
- **Interceptors**: Inserção automática de tokens
- **Controle de Sessão**: Persistência de login

#### 📚 **Gerenciamento de Livros**
- **Listar**: Visualização paginada com filtros por título, autor e gênero
- **Criar**: Cadastro de novos livros
- **Editar**: Atualização de informações
- **Excluir**: Remoção com confirmação
- **Busca**: Sistema de busca em tempo real com debounce

#### 👨‍💼 **Gerenciamento de Autores**
- **CRUD Completo**: Criar, listar, editar e excluir autores
- **Busca**: Filtro por nome
- **Paginação**: Navegação eficiente

#### 🏷️ **Gerenciamento de Gêneros**
- **CRUD Completo**: Criar, listar, editar e excluir gêneros
- **Busca**: Filtro por nome
- **Paginação**: Navegação eficiente

#### 🎨 **Interface e UX**
- **Material Design**: Interface moderna e responsiva
- **Loading States**: Indicadores visuais de carregamento
- **Error Handling**: Tratamento de erros com feedback ao usuário
- **Confirmações**: Diálogos de confirmação para ações críticas

## 🛠️ **Tecnologias Utilizadas**

- **Angular 18**: Framework principal com standalone components
- **NgRx 18**: Gerenciamento de estado reativo
- **Angular Material 18**: Sistema de design
- **TypeScript 5.5**: Tipagem estática
- **RxJS 7.8**: Programação reativa
- **SCSS**: Estilização avançada

## 📋 **Pré-requisitos**

Antes de começar, certifique-se de ter instalado:

- **Node.js 18+**: [Download](https://nodejs.org/)
- **Angular CLI 18+**: `npm install -g @angular/cli`
- **Books API**: A API backend deve estar rodando em `http://localhost:8080`

## 🚀 **Como Executar**

### 1. **Clone o Repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd books-frontend
```

### 2. **Instale as Dependências**
```bash
npm install
```

### 3. **Inicie a API Backend**
Certifique-se de que a Books API está rodando:
```bash
cd ../books-api
docker-compose up -d
```

### 4. **Execute o Frontend**
```bash
# Desenvolvimento
npm start
# ou
ng serve

# A aplicação estará disponível em http://localhost:4200
```

### 5. **Acesse a Aplicação**
Abra seu navegador e vá para: `http://localhost:4200`

## 🔑 **Como Fazer Login**

### **Usuários de Teste**
A aplicação possui usuários pré-cadastrados para teste:

| Usuário | Senha   | Perfil          | Permissões                    |
|---------|---------|-----------------|-------------------------------|
| `admin` | `123456`| READER, WRITER  | 🟢 Todas as operações CRUD   |
| `writer`| `123456`| READER, WRITER  | 🟢 Todas as operações CRUD   |
| `reader`| `123456`| READER          | 🟡 Apenas operações de leitura|

### **Passos para Login**
1. **Acesse a aplicação**: http://localhost:4200
2. **Você será redirecionado** automaticamente para a tela de login
3. **Digite as credenciais**:
   - **Usuário**: `admin` (ou `writer`, `reader`)
   - **Senha**: `123456`
4. **Clique em "Entrar"**
5. **Você será redirecionado** para o dashboard principal

### **Registro de Novos Usuários**
- Clique em **"Cadastrar-se"** na tela de login
- Preencha os dados (novos usuários recebem perfil READER por padrão)
- Faça login com as credenciais criadas

## 🎯 **Como Usar a Aplicação**

### **Dashboard Principal**
Após o login, você verá:
- **Estatísticas**: Número total de livros, autores e gêneros
- **Navegação**: Cards com links para cada seção
- **Menu Lateral**: Navegação rápida entre funcionalidades

### **Gerenciar Livros**
1. **Listar**: Vá em "Livros" para ver todos os livros
2. **Filtrar**: Use a busca por título, autor ou gênero
3. **Criar**: Clique em "Adicionar Livro" e preencha o formulário
4. **Editar**: Clique no botão "Editar" ao lado do livro desejado
5. **Excluir**: Clique no botão "Excluir" (requer confirmação)

### **Gerenciar Autores**
1. **Acesse**: Menu "Autores"
2. **Funcionalidades**: Criar, editar, listar e excluir autores
3. **Busca**: Digite no campo de busca para filtrar por nome

### **Gerenciar Gêneros**
1. **Acesse**: Menu "Gêneros" 
2. **Funcionalidades**: Criar, editar, listar e excluir gêneros
3. **Busca**: Digite no campo de busca para filtrar por nome

## 🏗️ **Estrutura do Projeto**

```
src/app/
├── core/                    # Serviços e utilitários globais
│   ├── guards/             # Guards de autenticação
│   ├── interceptors/       # Interceptors HTTP
│   ├── models/             # Interfaces TypeScript
│   └── services/           # Serviços HTTP
├── features/               # Módulos funcionais
│   ├── auth/              # Login e registro
│   ├── books/             # CRUD de livros
│   ├── authors/           # CRUD de autores
│   ├── genres/            # CRUD de gêneros
│   └── dashboard/         # Dashboard principal
├── shared/                # Componentes reutilizáveis
│   ├── components/        # Componentes compartilhados
│   └── layouts/           # Layouts da aplicação
└── store/                 # NgRx Store
    ├── auth/              # Estado de autenticação
    ├── books/             # Estado dos livros
    ├── authors/           # Estado dos autores
    └── genres/            # Estado dos gêneros
```

## ⚙️ **Scripts Disponíveis**

```bash
# Desenvolvimento
npm start                   # Inicia servidor de desenvolvimento

# Build
npm run build              # Build para produção
npm run build:dev          # Build para desenvolvimento

# Testes
npm test                   # Executa testes unitários
npm run test:watch         # Testes em modo watch

# Lint
npm run lint              # Verificação de código

# Outros
npm run serve:prod        # Serve build de produção
ng generate component     # Gera novos componentes
```

## 🔧 **Configuração de Ambiente**

### **Desenvolvimento** (`src/environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  authUrl: 'http://localhost:8080/auth'
};
```

### **Produção** (`src/environments/environment.prod.ts`)
Configure as URLs da API de produção antes do deploy.

## 🔗 **Integração com a API**

### **Endpoints Utilizados**
- **Autenticação**: `/auth/login`, `/auth/register`
- **Livros**: `/api/v1/books` (GET, POST, PUT, DELETE)
- **Autores**: `/api/v1/authors` (GET, POST, PUT, DELETE)
- **Gêneros**: `/api/v1/genres` (GET, POST, PUT, DELETE)

### **Autenticação JWT**
- Tokens são salvos no localStorage
- Inserção automática via interceptor
- Renovação automática de sessão

## 🚨 **Solução de Problemas**

### **Erro de CORS**
Verifique se a Books API está configurada para aceitar requisições de `http://localhost:4200`

### **Erro de Autenticação**
1. Verifique se a API está rodando
2. Confirme as credenciais de teste
3. Limpe o localStorage: `localStorage.clear()`

### **Erro de Compilação**
```bash
# Limpe e reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

### **Erro de Rota**
Verifique se todas as rotas da API estão acessíveis em `http://localhost:8080`

## 📱 **Responsividade**

A aplicação é totalmente responsiva e funciona em:
- **Desktop**: Layout completo com sidebar
- **Tablet**: Layout adaptado
- **Mobile**: Layout otimizado para telas pequenas

## 🧪 **Para Desenvolvedores**

### **Padrões Utilizados**
- **Standalone Components**: Nova arquitetura Angular 18
- **Reactive Forms**: Formulários reativos com validação
- **OnPush Strategy**: Otimização de performance (onde aplicável)
- **Lazy Loading**: Carregamento sob demanda de módulos

### **Estrutura de Estado (NgRx)**
```typescript
// Exemplo de estado
interface AppState {
  auth: AuthState;
  books: BooksState;
  authors: AuthorsState;
  genres: GenresState;
}
```

### **Interceptors Implementados**
- **AuthInterceptor**: Adiciona JWT automaticamente
- **ErrorInterceptor**: Tratamento global de erros
- **LoadingInterceptor**: Estados de carregamento

## 📞 **Suporte**

Para dúvidas ou problemas:
1. Verifique se a Books API está funcionando corretamente
2. Confirme que todas as dependências estão instaladas
3. Consulte os logs do console do navegador para erros específicos

## 📄 **Licença**

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

## 📄 **Prints da Aplicação**

<img width="1589" height="997" alt="image" src="https://github.com/user-attachments/assets/2dd3c08d-0f71-4b0c-9bc0-73a655bdf29b" />

<img width="1586" height="994" alt="image" src="https://github.com/user-attachments/assets/51c74709-7b2c-46db-b32a-d574d28461ef" />

**Desenvolvido com ❤️ usando Angular 18 e as melhores práticas de desenvolvimento**

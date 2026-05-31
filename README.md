# K Projeções & Eventos

Uma landing page moderna e performática para a **K Projeções & Eventos**, empresa especializada em soluções audiovisuais completas para eventos, formaturas e solenidades em Belém e região.

## 🚀 Tecnologias

Este projeto foi desenvolvido utilizando as tecnologias mais modernas do ecossistema web:

- **React 18** - Biblioteca para interfaces de usuário.
- **TypeScript** - Tipagem estática para maior segurança e produtividade.
- **Vite** - Build tool extremamente rápida.
- **Tailwind CSS** - Framework CSS utilitário para estilização rápida e responsiva.
- **Framer Motion** - Biblioteca para animações fluidas e interativas.
- **React Helmet Async** - Gerenciamento robusto de SEO e Meta Tags.
- **Lucide React** - Conjunto de ícones elegantes e leves.

## ✨ Funcionalidades

- **Design Responsivo**: Adaptado para dispositivos móveis, tablets e desktops.
- **Animações Interativas**: Scroll suave e surgimento gradual de seções.
- **Integração com WhatsApp**: Botões flutuantes e chamadas para ação configuradas.
- **SEO Avançado**: 
  - Meta tags dinâmicas por página.
  - Dados estruturados (JSON-LD) para `LocalBusiness`, `Service` e `ContactPage`.
  - Configurações centralizadas para fácil manutenção.
- **Analytics**: Integração pronta para monitoramento de tráfego.

## 📦 Como rodar o projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação
1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```

### Desenvolvimento
Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Build para Produção
Gere os arquivos otimizados:
```bash
npm run build
```
O resultado estará na pasta `dist/`.

## 🛠️ Estrutura de Pastas

```
src/
├── app/
│   ├── components/    # Componentes de UI e Layout
│   ├── hooks/         # Hooks personalizados (scroll, visibilidade)
│   ├── lib/           # Lógica de negócio, dados e config de SEO
│   ├── pages/         # Páginas da aplicação (Home, Events, Contact)
│   └── types/         # Definições de tipos TypeScript
└── main.tsx           # Ponto de entrada
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido com ❤️ para a **K Projeções & Eventos**.

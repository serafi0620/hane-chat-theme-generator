# ✨ 하네 채팅 테마 커스텀 (Hane Chat Theme Generator)

이 프로젝트는 하네 채팅 스타일을 실시간으로 커스터마이징하고, 생성된 CSS 코드를 복사하여 사용할 수 있게 도와주는 웹 애플리케이션입니다.
기존의 단일 `index.html` 파일을 **Vite + React + Tailwind CSS** 기반의 모던한 구조로 리팩토링하였습니다.

---

## 🚀 시작하기 (Local Development)

이 프로젝트를 로컬 환경에서 실행하려면 [Node.js](https://nodejs.org/)가 설치되어 있어야 합니다.

1.  **의존성 패키지 설치**
    ```bash
    npm install
    ```

2.  **개발 서버 실행**
    ```bash
    npm run dev
    ```
    터미널에 표시된 주소(보통 `http://localhost:5173`)를 클릭하여 브라우저에서 확인하세요.

---

## 📂 프로젝트 구조 (File Structure)

```text
hane-chat-theme-generator/
├── index.html              # 앱의 메인 진입점 (HTML)
├── package.json            # 프로젝트 설정 및 라이브러리 목록
├── vite.config.js          # Vite 빌드 도구 설정
├── tailwind.config.js      # 스타일 프레임워크(Tailwind) 설정
├── postcss.config.js       # CSS 후처리 설정
├── src/                    # 모든 소스 코드가 위치한 폴더
│   ├── main.jsx            # React 앱을 시작하고 DOM에 연결하는 입구
│   ├── App.jsx             # 앱의 메인 컴포넌트 (상태 관리 및 레이아웃)
│   ├── components/         # 기능별 화면 조각 (컴포넌트)
│   │   ├── EditorPanel.jsx  # 왼쪽: 색상 및 옵션 설정 패널
│   │   ├── PreviewPanel.jsx # 오른쪽 상단: 실시간 방송 화면 프리뷰
│   │   └── CodePanel.jsx    # 오른쪽 하단: 결과 CSS 코드 출력 및 복사
│   ├── constants/          # 고정된 데이터 저장
│   │   └── chatData.js     # 가짜 채팅 데이터 및 프리뷰 설정값
│   ├── utils/              # 공통 함수 모음
│   │   └── cssGenerator.js  # 상태를 기반으로 CSS 문자열을 생성하는 로직
│   └── styles/             # 스타일 파일
│       └── index.css       # 전역 스타일 및 웹 폰트 설정
└── README.md               # 현재 이 문서
```

---

## 📝 파일별 상세 설명

### 1. 설정 파일 (Configuration)
*   **`package.json`**: 프로젝트 이름, 버전, 필요한 라이브러리(`react`, `lucide-react`, `tailwindcss` 등)와 실행 명령어(`dev`, `build`)가 정의되어 있습니다.
*   **`vite.config.js`**: 매우 빠른 빌드 도구인 Vite 설정을 담당합니다. React 플러그인을 사용하여 개발 편의성을 높입니다.
*   **`tailwind.config.js`**: CSS 클래스 작성을 도와주는 Tailwind CSS의 테마와 파일 경로 설정을 담고 있습니다.

### 2. 소스 코드 (Source Code)
*   **`index.html`**: 브라우저가 가장 먼저 읽는 파일입니다. `<div id="root"></div>`에 React 앱이 그려집니다.
*   **`src/main.jsx`**: React의 `StrictMode`를 적용하고 `App.jsx`를 화면에 띄웁니다. 전역 스타일인 `index.css`를 불러옵니다.
*   **`src/App.jsx`**: **프로젝트의 두뇌**입니다. 모든 설정(색상, 너비 등)을 `useState`로 관리하며, `PreviewPanel`과 `EditorPanel` 사이에서 데이터를 전달합니다.
*   **`src/components/EditorPanel.jsx`**: 사용자가 색상을 선택하거나 슬라이더를 조절하는 UI를 담당합니다.
*   **`src/components/PreviewPanel.jsx`**: 실제 방송 화면(1920x1080)을 축소해서 보여주는 복잡한 로직을 담고 있습니다. 화면 크기가 변해도 비율을 유지하도록 설계되었습니다.
*   **`src/components/CodePanel.jsx`**: 완성된 CSS를 보여주고 버튼을 누르면 클립보드에 복사하는 기능을 수행합니다.
*   **`src/utils/cssGenerator.js`**: 입력받은 색상값 등을 조립하여 하나의 완성된 CSS 코드를 텍스트로 만들어주는 "공장" 역할을 합니다.

---

## ☁️ 배포 안내 (Cloudflare Pages)

이 구조를 Cloudflare Pages에 배포할 때는 다음과 같이 설정하세요:

1.  **Framework Preset**: `Vite`
2.  **Build Command**: `npm run build`
3.  **Build Output Directory**: `dist`

빌드가 완료되면 Vite가 소스 코드를 최적화하여 `dist` 폴더를 생성하고, Cloudflare는 해당 폴더의 내용을 전 세계에 서비스합니다.

---

## 🛠 사용된 주요 기술
*   **React**: UI 컴포넌트 라이브러리
*   **Vite**: 초고속 프런트엔드 빌드 도구
*   **Tailwind CSS**: 유틸리티 우선의 스타일링 프레임워크
*   **Lucide React**: 현대적인 아이콘 라이브러리

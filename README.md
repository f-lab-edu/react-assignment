# 1차 기술 과제

# ✨ 주요 기능
### 1단계: 휴대폰 번호 입력

* 010-XXXX-XXXX 형식으로 입력 제한
* 실시간 유효성 검증 및 에러 메시지 표시
* 유효한 번호 입력 시 "인증번호 요청" 버튼 활성화
* API 호출을 통한 인증번호 발송

### 2단계: 인증번호 입력

* 6자리 인증번호 입력 필드
* 인증번호 검증 API 연동
* 성공/실패에 따른 상태 관리 및 UI 피드백
* 인증 완료 시 버튼 비활성화로 완료 상태 유지

# 📁 프로젝트 구조
```text
src/
├── components/
│   ├── PhoneNumberInput.tsx                
│   └── VerificationCodeInput.tsx           
├── types/
│   └── auth.ts                     
├── utils/
│   └── validation.ts               
├── mocks/
│   ├── browser.ts   
│   └── handlers.ts    
├── App.css    
├── App.tsx    
├── index.css     
├── main.tsx            
└── vite-env.d.ts
```

## 🚀 프로젝트 실행
```bash
git clone git@github.com:f-lab-edu/react-assignment.git

cd react-assignment

npm i

npm run dev
```
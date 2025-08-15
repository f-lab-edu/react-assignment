import { useState } from "react";
import "./App.css";
import PhoneNumberInput from "./components/PhoneNumberInput.tsx";
import VerificationCodeInput from "./components/VerificationCodeInput.tsx";

interface VerificationResponse {
  success: boolean;
  message: string;
  data?: {
    phoneNumber?: string;
    expiresAt?: number;
    verified?: boolean;
  };
}

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
      "success"
  );

  const isPartialPhoneNumberValid= (phoneNumber: string) => {
    const phoneLen  = phoneNumber.length;
    const templateNumbers = "010".slice(0,phoneLen);
    if(phoneLen <= 3) {
      return templateNumbers === phoneNumber;
    } else if(phoneLen <= 8) {
      return /^010-\d*$/.test(phoneNumber);
    } else if(phoneLen <= 13) {
      return /^010-\d{4}-\d*$/.test(phoneNumber);
    }
  }

  const handlePhoneChange = async (inputPhoneNumber: string) => {
    setPhoneNumber(inputPhoneNumber);

    if(!isPartialPhoneNumberValid(inputPhoneNumber)) {
      setMessage("올바른 번호를 입력해주세요");
      setMessageType("error");
    } else {
      setMessage("");
      setMessageType("success");
    }
  }

  const sendVerificationCode = async () => {
    if (!phoneNumber) {
      setMessage("휴대폰 번호를 입력해주세요.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data: VerificationResponse = await response.json();

      if (data.success) {
        setMessage(data.message);
        setMessageType("success");
      } else {
        setMessage(data.message);
        setMessageType("error");
      }
    } catch {
      setMessage("서버 오류가 발생했습니다.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
      setIsVerificationStep(true);
    }
  };

  const verifyCode = async () => {
    if (!phoneNumber || !verificationCode) {
      setMessage("휴대폰 번호와 인증번호를 입력해주세요.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, code: verificationCode }),
      });

      const data: VerificationResponse = await response.json();

      if (data.success) {
        setMessage("인증되었습니다!");
        setMessageType("success");
        setIsCompleted(true);
      } else {
        setMessage("인증번호가 올바르지 않습니다");
        setMessageType("error");
      }
    } catch {
      setMessage("서버 오류가 발생했습니다.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="app">
        <h1>휴대폰 인증번호 테스트</h1>
        <p>MSW를 활용한 휴대폰 인증번호 API 테스트</p>
        <div className="form-container">
          { !isVerificationStep ?
              <PhoneNumberInput
                  phoneNumber={phoneNumber}
                  onChange={handlePhoneChange}
                  isLoading={isLoading}
                  sendVerificationCode={sendVerificationCode}
              />
              :
              <VerificationCodeInput
                  verificationCode={verificationCode}
                  onChange={(verificationCode: string) => setVerificationCode(verificationCode)}
                  verifyCode={verifyCode}
                  isLoading={isLoading}
                  isCompleted={isCompleted}
              />
          }
          {message && <div className={`message ${messageType}`}>{message}</div>}
        </div>

        <div className="info">
          <h3>사용 방법:</h3>
          <ul>
            <li>휴대폰 번호를 입력하고 "인증번호 발송" 버튼을 클릭하세요</li>
            <li>콘솔에서 발송된 인증번호를 확인할 수 있습니다</li>
            <li>인증번호를 입력하고 "인증번호 확인" 버튼을 클릭하세요</li>
            <li>인증번호는 5분 후 만료됩니다</li>
          </ul>
        </div>
      </div>
  );
}

export default App;
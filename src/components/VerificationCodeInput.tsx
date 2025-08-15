export default function VerificationCodeInput({verificationCode,onChange,verifyCode, isLoading, isCompleted} :{
    verificationCode: string;
    onChange: (verificationCode: string) => void;
    verifyCode: () => void;
    isLoading: boolean;
    isCompleted: boolean;
}) {
    return (
        <>
            <div className="form-group">
                <label htmlFor="verificationCode">인증번호:</label>
                <input
                    id="verificationCode"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="6자리 인증번호"
                    disabled={isLoading}
                    maxLength={6}
                />
            </div>

            <div className="button-group">
                <button
                    onClick={verifyCode}
                    disabled={isLoading || !verificationCode || isCompleted}
                    className="verify-button"
                >
                    {isLoading ? "확인 중..." : "인증번호 확인"}
                </button>
            </div>
        </>
    )
}
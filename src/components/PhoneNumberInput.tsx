export default function PhoneNumberInput({phoneNumber, onChange, isLoading, sendVerificationCode}: {
    phoneNumber: string,
    onChange: (value: string) => void;
    isLoading: boolean;
    sendVerificationCode: () => void;
}) {
    const isCompletePhoneNumber = (phoneNumber: string) => {
        return /^010-\d{4}-\d{4}$/.test(phoneNumber);
    }

    return (
        <>
            <div className="form-group">
                <label htmlFor="phoneNumber">휴대폰 번호:</label>
                <input
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="010-1234-5678"
                    disabled={isLoading}
                />
            </div>

            <div className="button-group">
                <button
                    onClick={sendVerificationCode}
                    disabled={isLoading || !phoneNumber || !isCompletePhoneNumber(phoneNumber)}
                    className="send-button"
                >
                    {isLoading ? "발송 중..." : "인증번호 발송"}
                </button>
            </div>
        </>
    )
}
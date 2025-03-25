async function login() {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    const resultDiv = document.getElementById("result");

    if (!userId || !password) {
        resultDiv.innerHTML = "아이디와 비밀번호를 입력하세요.";
        return;
    }

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbyYauE05c_bKa987Z9bXrJgAltV8c5tkfoDMILz2IlLFzTYKbjW1FngZSadZRQSwM9G/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: userId, password: password }),
        });

        if (!response.ok) throw new Error("서버 응답 오류");

        const data = await response.json();

        if (data.success) {
            resultDiv.innerHTML = `
                <p>성적: <strong>${data.score}</strong></p>
                <p><a href="${data.downloadLink}" target="_blank">파일 다운로드</a></p>
            `;
        } else {
            resultDiv.innerHTML = "로그인 실패! 아이디 또는 비밀번호를 확인하세요.";
        }
    } catch (error) {
        console.error("Error:", error);
        resultDiv.innerHTML = "서버에 접속할 수 없습니다.";
    }
}

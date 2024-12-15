// 获取当前日期并生成动态密码
function getDynamicPassword() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}${month}${day}`; // 生成类似20241214的格式
}

// 密码验证
function verifyPassword() {
    const enteredPassword = document.getElementById("password").value;
    const correctPassword = getDynamicPassword();

    if (enteredPassword === correctPassword) {
        // 密码正确，跳转到数据浏览页面
        window.location.href = "log.html"; // 进入数据浏览面板
    } else {
        // 密码错误，弹出提示
        document.getElementById("password-status").innerText = "密码错误，请重新输入。";
        document.getElementById("password").value = ''; // 清空密码框
    }
}

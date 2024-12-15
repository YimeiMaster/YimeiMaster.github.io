// 获取当前日期并生成动态密码
function getDynamicPassword() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}${month}${day}`;
}

// 密码验证
function verifyPassword() {
    const enteredPassword = document.getElementById("password").value;
    const correctPassword = getDynamicPassword();

    if (enteredPassword === correctPassword) {
        document.getElementById("password-status").innerText = "密码验证成功！";
        document.getElementById("log-panels").style.display = "block";
        loadLogs();
    } else {
        document.getElementById("password-status").innerText = "密码错误，请重新输入。";
    }
}

// 获取浏览记录和提交记录
function loadLogs() {
    const browseLogs = JSON.parse(localStorage.getItem("browseLogs")) || [];
    const submitLogs = JSON.parse(localStorage.getItem("submitLogs")) || [];

    const browseTable = document.getElementById("browse-records").getElementsByTagName("tbody")[0];
    const submitTable = document.getElementById("submit-records").getElementsByTagName("tbody")[0];

    // 填充浏览记录
    browseLogs.forEach((log, index) => {
        const row = browseTable.insertRow();
        row.innerHTML = `<td>${index + 1}</td><td>${log.ip}</td><td>${log.time}</td>`;
    });

    // 填充提交记录
    submitLogs.forEach((log, index) => {
        const row = submitTable.insertRow();
        row.innerHTML = `<td>${index + 1}</td><td>${log.ip}</td><td>${log.timeS}</td><td>${log.name}</td><td>${log.email}</td><td>${log.content}</td><td>${log.attachmentStatus}</td><td>${log.sendingStatus}</td><td>${log.timeE}</td>`;
    });
}

// 导出CSV
function downloadCSV(type) {
    let logs = [];
    if (type === "browse") {
        logs = JSON.parse(localStorage.getItem("browseLogs")) || [];
    } else if (type === "submit") {
        logs = JSON.parse(localStorage.getItem("submitLogs")) || [];
    }

    const csvContent = "data:text/csv;charset=utf-8,"
        + (type === "browse" ? "ID,IP,TIME\n" : "ID,IP,TIME-S,Name,Email,Content,Attachment Status,Sending Status,Time-E\n")
        + logs.map(log => {
            return type === "browse" ? `${log.id},${log.ip},${log.time}` :
                `${log.id},${log.ip},${log.timeS},${log.name},${log.email},${log.content},${log.attachmentStatus},${log.sendingStatus},${log.timeE}`;
        }).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", type === "browse" ? "browse_records.csv" : "submit_records.csv");
    document.body.appendChild(link);
    link.click();
}

const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'YimeiMaster';  // 你的 GitHub 用户名
const REPO_NAME = 'Data_analysis';  // 仓库名
const FILE_PATH = 'logs.json';  // 文件路径
const TOKEN = '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';  // 你获取的 GitHub token

// 将数据提交到 GitHub 仓库中的 JSON 文件
async function saveDataToGitHub(data) {
    const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const sha = await getFileSha();  // 获取现有文件的 sha 值，如果文件不存在则无需此步骤

    const content = btoa(JSON.stringify(data, null, 2));  // 将 JSON 数据转换为 Base64 编码
    const commitMessage = 'Update logs.json with new data';

    const requestBody = {
        message: commitMessage,
        content: content,
        sha: sha,
    };

    const response = await fetch(url, {
        method: sha ? 'PUT' : 'POST',
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    console.log(result);
    if (response.ok) {
        alert('数据已成功保存到 GitHub！');
    } else {
        alert('保存失败，请检查日志。');
    }
}

// 获取文件的 SHA 值，检查文件是否存在
async function getFileSha() {
    const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const response = await fetch(url, {
        headers: { 'Authorization': `token ${TOKEN}` },
    });

    if (response.ok) {
        const fileData = await response.json();
        return fileData.sha;  // 返回现有文件的 SHA 值
    }
    return null;  // 文件不存在时返回 null
}

// 示例：保存数据
const logsData = [
    { id: 1, ip: '192.168.1.1', time: new Date().toLocaleString() },
    { id: 2, ip: '192.168.1.2', time: new Date().toLocaleString() },
];
saveDataToGitHub(logsData);

// 从 GitHub 仓库读取 JSON 数据
async function getDataFromGitHub() {
    const url = `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

    const response = await fetch(url, {
        headers: { 'Authorization': `token ${TOKEN}` },
    });

    if (response.ok) {
        const fileData = await response.json();
        const content = atob(fileData.content);  // 解码 Base64 内容
        const jsonData = JSON.parse(content);  // 将内容转换为 JSON 数据
        console.log(jsonData);
        displayData(jsonData);  // 显示数据
    } else {
        alert('读取数据失败！');
    }
}

// 展示数据
function displayData(data) {
    const table = document.getElementById('data-table');  // 假设你有一个 table 元素来显示数据
    data.forEach(item => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.textContent = item.id;
        cell2.textContent = item.ip;
        cell3.textContent = item.time;
    });
}

// 调用函数读取数据并展示
getDataFromGitHub();



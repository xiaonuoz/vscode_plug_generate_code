const vscode = require('vscode');
const fs = require('fs').promises; // 引入 fs.promises 模块
const { exec } = require('child_process');

// 注册 "生成 param" 命令
const generateAddParamCommand = vscode.commands.registerCommand('extension.generateAddParam', async () => {
	const command = await generateCommand("param");
    if (command) {
        // 在这里使用 command 执行你的命令
        exec(command, (error, stdout, stderr) => {
		if (error) {
			vscode.window.showErrorMessage(`执行程序时出错: ${error.message}`);
			return;
		}
		if (stderr) {
			vscode.window.showErrorMessage(`执行程序时出错: ${stderr}`);
			return;
		}
      	});
    }
});

// 注册 "生成 model" 命令
const generateAddModelCommand = vscode.commands.registerCommand('extension.generateAddModel', async () => {
	const command = await generateCommand("model");
    if (command) {
        // 在这里使用 command 执行你的命令
        exec(command, (error, stdout, stderr) => {
		if (error) {
			vscode.window.showErrorMessage(`执行程序时出错: ${error.message}`);
			return;
		}
		if (stderr) {
			vscode.window.showErrorMessage(`执行程序时出错: ${stderr}`);
			return;
		}
      	});
    }
});

// 注册 "生成 Service" 命令
const generateAddServiceCommand = vscode.commands.registerCommand('extension.generateAddService', async () => {
	const command = await generateCommand("service");
    if (command) {
        // 在这里使用 command 执行你的命令
        exec(command, (error, stdout, stderr) => {
		if (error) {
			vscode.window.showErrorMessage(`执行程序时出错: ${error.message}`);
			return;
		}
		if (stderr) {
			vscode.window.showErrorMessage(`执行程序时出错: ${stderr}`);
			return;
		}
      	});
    }
});

// 注册 "生成 Handler" 命令
const generateAddHandlerCommand = vscode.commands.registerCommand('extension.generateAddHandler', async () => {
	const command = await generateCommand("handler");
    if (command) {
        // 在这里使用 command 执行你的命令
        exec(command, (error, stdout, stderr) => {
		if (error) {
			vscode.window.showErrorMessage(`执行程序时出错: ${error.message}`);
			return;
		}
		if (stderr) {
			vscode.window.showErrorMessage(`执行程序时出错: ${stderr}`);
			return;
		}
      	});
    }
});

// 注册 "生成 SDK" 命令
const generateAddSDKCommand = vscode.commands.registerCommand('extension.generateAddSDK', async () => {
	const command = await generateCommand("sdk");
    if (command) {
        // 在这里使用 command 执行你的命令
        exec(command, (error, stdout, stderr) => {
		if (error) {
			vscode.window.showErrorMessage(`执行程序时出错: ${error.message}`);
			return;
		}
		if (stderr) {
			vscode.window.showErrorMessage(`执行程序时出错: ${stderr}`);
			return;
		}
      	});
    }
});

// 激活插件
function activate(context) {
    context.subscriptions.push(generateAddParamCommand);
    context.subscriptions.push(generateAddModelCommand);
    context.subscriptions.push(generateAddServiceCommand);
    context.subscriptions.push(generateAddHandlerCommand);
    context.subscriptions.push(generateAddSDKCommand);
}

// 停用插件
function deactivate() {}

module.exports = {
    activate,
    deactivate
};

// 获取生成command
async function generateCommand(paramValue) {
    let filePath; // 在这里声明 filePath 变量
    // 获取当前活动的文本编辑器
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        // 获取当前编辑文件的 URI
        const fileUri = editor.document.uri;

        // 将 URI 转换为文件系统路径
        filePath = fileUri.fsPath;

        // 在此处使用 filePath，进行进一步的操作
    } else {
        vscode.window.showErrorMessage('没有打开的文件编辑器。');
        return null;
    }

    // 提示用户输入字符串
    const input = await vscode.window.showInputBox({
        placeHolder: '请输入项目地址'
    });

    if (!input) {
        // 如果用户没有输入内容，直接返回
        return null;
    }

    // 获取特定环境变量
    const goroot = process.env.GOROOT;

    if (goroot) {
        const makerPath = `${goroot}\\bin\\go_cli_singo_generate_code.exe`;

        // 异步检查文件是否存在
        try {
            await fs.access(makerPath);

            // 构建完整的命令
            const command = `"${makerPath}" "${paramValue}" "${filePath}" "${input}"`;
            return command;
        } catch (error) {
            vscode.window.showErrorMessage(`文件不存在: ${makerPath}`);
            return null;
        }
    } else {
        vscode.window.showErrorMessage('GOROOT 环境变量未设置。');
        return null;
    }
}
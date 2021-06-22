import * as vscode from 'vscode';
import got from 'got';
import * as FormData from 'form-data';
import utils from './utils';
import { locale as $l } from './utils';

interface Content {
    words_result: [],
    [key: string]: any
}

interface DefaultUrl {
    api: string,
    [key: string]: any
}
interface ModelMapping {
    "通用文字识别（标准版）": string;
    "通用文字识别（高精度版）": string;
    "数字识别": string;
}
const modelMapping: ModelMapping = {
    "通用文字识别（标准版）": "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic",
    "通用文字识别（高精度版）": "https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic",
    "数字识别": "https://aip.baidubce.com/rest/2.0/ocr/v1/numbers"
};

async function getUrlByConfig(client_id: string, client_secret: string): Promise<string> {
    let config = utils.getConfig();
    const model: keyof ModelMapping = config.model;
    const data: any = await got(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`).json();
    if (!data['access_token']) {
        throw($l['get_access_token_error_msg']);
    }
    const access_token = data['access_token'];
    return `${modelMapping[model]}?access_token=${access_token}`;
}

async function getDefaultUrl():Promise<DefaultUrl> {
    const config: DefaultUrl = await got('http://i.rcuts.com/update/404').json();
    if (!config.api) {
        throw($l['get_default_token_error_msg']);
    }
    return config;
}

async function postImgToOCR(url: string, base64str: string):Promise<Content> {
    const form = new FormData();
    form.append('image', base64str);
    const content: any = await got.post(url, {
        body: form
    }).json();
    if(!content['words_result'] && content['error_msg']) {
        throw(content['error_msg']);
    }
    return content;
}

export default {
    getUrlByConfig,
    getDefaultUrl,
    postImgToOCR
}
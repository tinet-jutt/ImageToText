import zh_cn from './locale.zh-cn';

export default {
    no_image: 'no image',
    loading: "Trying to parse...",
    install_xclip: "You need to install xclip command first.",
    powershell_not_found: "The powershell command is not in you PATH environment variables. Please add it and retry.",
    get_access_token_error_msg: 'Get the access_token invalidated',
    get_default_token_error_msg: 'Default third-party tokens have expired,Please configure client_id and client_secret of OCR'
};

let $: any = { 'zh-cn': zh_cn};
export { $ };
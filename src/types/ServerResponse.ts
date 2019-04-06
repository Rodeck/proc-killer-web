export class ServerResponse<TResult> {
    isOk: boolean;
    statusCode: number;
    result: TResult;

    constructor(_isok: boolean, _statusCode: number, _result: TResult) {
        this.isOk = _isok;
        this.statusCode = _statusCode;
        this.result = _result;
    }
}
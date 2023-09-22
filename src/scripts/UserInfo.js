export default class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }

    getUserInfo(inputName, inputJob) {
        inputName = this._name.textContent;
        inputJob = this._job.textContent;
    }

    setUserInfo(nameUser, jobUser) {
        this._name.textContent = nameUser;
        this._job.textContent = jobUser;
    }

    getUserInfo() {
        return {'name' : this._name.textContent, 'job' : this._job.textContent};
    }
}
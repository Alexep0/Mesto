export default class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }

    setUserInfo(nameUser, jobUser) {
        this._name.textContent = nameUser;
        this._job.textContent = jobUser;
    }

    getUserInfo = () => {
        return {
          name: this._name.textContent,
          job: this._job.textContent,
        };
      };
}
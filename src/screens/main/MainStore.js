import {action, observable} from 'mobx';
import networkService from '../../services/networkService';

class MainStore {
  @observable photos = [];
  @observable loader = false;
  @action loadPhotos = () => {
    this.loader = true;
    networkService('photos')
      .then(data => (this.photos = data))
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.loader = false;
      });
  };
}
const mainStore = new MainStore();
export default mainStore;

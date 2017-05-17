import { BgswitchPage } from './app.po';

describe('bgswitch App', () => {
  let page: BgswitchPage;

  beforeEach(() => {
    page = new BgswitchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

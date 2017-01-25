import { Actv8ClientDashboardPage } from './app.po';

describe('actv8-client-dashboard App', function() {
  let page: Actv8ClientDashboardPage;

  beforeEach(() => {
    page = new Actv8ClientDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

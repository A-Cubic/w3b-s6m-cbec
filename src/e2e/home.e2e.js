import Nightmare from 'nightmare';

describe('Homepage', () => {
  it('it should have logo text', async () => {
    const page = Nightmare().goto('http://localhost:8000');
    const text = await page.wait('span').evaluate(() => document.body.innerHTML).end();
    expect(text).toContain('Ant Design Pro');
  });
});

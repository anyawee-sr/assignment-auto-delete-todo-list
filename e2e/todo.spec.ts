import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.clock.install()
  await page.goto('/')
})

test('shows all todos in main list and empty type columns on load', async ({
  page,
}) => {
  const mainList = page.getByRole('region', { name: 'Main list', exact: true })

  await expect(mainList.getByRole('button')).toHaveText([
    'Apple',
    'Broccoli',
    'Mushroom',
    'Banana',
    'Tomato',
    'Orange',
    'Mango',
    'Pineapple',
    'Cucumber',
    'Watermelon',
    'Carrot',
  ])
  await expect(
    page
      .getByRole('region', { name: 'Fruit', exact: true })
      .getByRole('button'),
  ).toHaveCount(0)
  await expect(
    page
      .getByRole('region', { name: 'Vegetable', exact: true })
      .getByRole('button'),
  ).toHaveCount(0)
})

test('moves Tomato to Vegetable and back to the end of main list after 5 seconds', async ({
  page,
}) => {
  const mainList = page.getByRole('region', { name: 'Main list', exact: true })
  const vegetableList = page.getByRole('region', {
    name: 'Vegetable',
    exact: true,
  })

  await mainList.getByRole('button', { name: 'Tomato', exact: true }).click()
  await expect(
    mainList.getByRole('button', { name: 'Tomato', exact: true }),
  ).toHaveCount(0)
  await expect(
    vegetableList.getByRole('button', { name: 'Tomato', exact: true }),
  ).toBeVisible()

  await page.clock.runFor(5000)

  await expect(vegetableList.getByRole('button')).toHaveCount(0)
  await expect(mainList.getByRole('button').last()).toHaveText('Tomato')
})

test('moves Tomato back immediately when clicked in Vegetable', async ({
  page,
}) => {
  const mainList = page.getByRole('region', { name: 'Main list', exact: true })
  const vegetableList = page.getByRole('region', {
    name: 'Vegetable',
    exact: true,
  })

  await mainList.getByRole('button', { name: 'Tomato', exact: true }).click()

  await expect(
    mainList.getByRole('button', { name: 'Tomato', exact: true }),
  ).toHaveCount(0)
  await expect(
    vegetableList.getByRole('button', { name: 'Tomato', exact: true }),
  ).toBeVisible()

  await vegetableList
    .getByRole('button', { name: 'Tomato', exact: true })
    .click()

  await expect(mainList.getByRole('button').last()).toHaveText('Tomato')

  await page.clock.runFor(5000)

  await expect(
    mainList.getByRole('button', { name: 'Tomato', exact: true }),
  ).toHaveCount(1)
})

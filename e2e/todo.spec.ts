import { expect, test } from '@playwright/test'
import { AUTO_MOVE_DELAY_MS } from '../src/constants/todo'
import { RAW_TODO_LIST } from '../src/data/rawTodoList'

// Todos are bundled with the app, so e2e reads the real data.
// If they move to an API, mock the response with page.route() instead.
const allTodoNames = RAW_TODO_LIST.map(({ name }) => name)

test.beforeEach(async ({ page }) => {
  await page.clock.install()
  await page.goto('/')
})

test('shows all todos in main list and empty type columns on load', async ({
  page,
}) => {
  const mainList = page.getByRole('region', { name: 'Main list', exact: true })

  await expect(mainList.getByRole('button')).toHaveText(allTodoNames)
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

test('moves Tomato to Vegetable and back to the end of main list after the auto-move delay', async ({
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

  await page.clock.runFor(AUTO_MOVE_DELAY_MS)

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

  await page.clock.runFor(AUTO_MOVE_DELAY_MS)

  await expect(
    mainList.getByRole('button', { name: 'Tomato', exact: true }),
  ).toHaveCount(1)
})

fixture`stream error`

test('test', async t => {
  const result = await t
    .request({
      url: `http://localhost:3010/stream/error`,
    })

  await t.expect(result.status).eql(200)
})

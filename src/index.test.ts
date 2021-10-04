import { processFile, loadFile } from './index'

test('it processes a file', async () => {
    await processFile('.env')
})

test('it loads environment variables from a string', () => {
    loadFile('TEST1=abc123\nTEST2=def456')
    expect(process.env.TEST1).toEqual('abc123')
    expect(process.env.TEST2).toEqual('def456')
})

test('it doesn\'t overwrite existing environment variables', () => {
    // Given that we know an environment variable that exists
    const val = process.env.HOME
    // And we have a file with the same key in it
    loadFile('HOME=newval')

    // Then I expect the value to not have changed
    expect(process.env.HOME).toEqual(val)
})

import { debounce } from '@std/async'
import { watch } from 'node:fs/promises'
import { join } from 'node:path'


const { clear , log } = console


const local_folder = import.meta.dir

const root_folder = join(local_folder,'..','..')

const source_folder = join(root_folder,'Source')

const theme_folder = join(root_folder,'Dev','Theme')

const asset_folder = join(theme_folder,'assets')

const build_folder = join(root_folder,'Dev','Build')


const watcher = watch(
    source_folder ,
    { recursive : true }
)


const debounced = debounce(() => {

    clear()

    log(`Rebuilding ..`)

    bundle()

    copy()

},200)


bundle()
copy()


for await ( const _ of watcher )
    debounced()



async function bundle (){

    log(`Bundling`)

    await Bun.build({
        entrypoints : [ join( source_folder , 'mod.ts') ] ,
        outdir : build_folder
    })

    let path = join(build_folder,'mod.js')

    const data = await Bun
        .file(path)
        .text()

    path = join(asset_folder,'Carousel.js')

    await Bun.write(path,data)
}

async function copy (){

    log(`Copying`)

    let path = join(source_folder,'Section.liquid')

    let data = await Bun.file(path).text()

    path = join(theme_folder,'sections','Carousel.liquid')

    await Bun.write(path,data)
}

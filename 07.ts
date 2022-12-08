const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

// check if it's a folder and create a folder in here
const createFile = (inp: string, fs = {}, folder: string) => {
  if (inp.startsWith('dir ')) {
    return fs[folder === '/' ? `${folder}${inp.split(' ')[1]}` : `${folder}/${inp.split(' ')[1]}`] = {files: []};
  }
  return fs[folder].files.push({name: inp.split(" ")[1], size: Number(inp.split(" ")[0])});
}

const createFileSystem = (inps: string[]) => {
  let currentFolder = '/';
  let fileSystem = { '/': {files: []}};
  inps.forEach(inp => {
    if (!inp.startsWith('$ ')) {
      createFile(inp, fileSystem, currentFolder);
    } else if (inp.startsWith('$ cd') && inp !== '$ cd ..') {
      currentFolder = currentFolder === '/' ? `${currentFolder}${inp.replace('$ cd ', '')}` : `${currentFolder}/${inp.replace('$ cd ', '')}`
    } else if (inp === '$ cd ..') {
      currentFolder = currentFolder.replace(/\/[A-z]+$/, '');
    }
  })
  return fileSystem;
}

const MaxLimit = 100000;
const FullSpace = 70000000;
const SpaceRequired = 30000000;

const fileSystem = createFileSystem(input.split('\n').slice(1));

const sum = (a: Record<string, any>, b: Record<string, any>) => a + b.size

const actualSysSize = Object.keys(fileSystem).map((folder) => {                    
  return {
    name: folder,
    size: fileSystem[folder].files.reduce(sum, 0)
  }
}).reduce(sum, 0);

const spaceToFree = SpaceRequired - (FullSpace - actualSysSize);

export const totalDoubleCount = Object.keys(fileSystem).map((folder, _, arr) => {   
  const filesSizes = fileSystem[folder].files.reduce(sum, 0);
  const children = arr.filter( el => el.startsWith(`${folder}/`));
  // add all children size Plus folder itself
  const totalSize = children.map(el => ({size: fileSystem[el].files.reduce(sum, 0)})).reduce(sum, 0) + filesSizes;                       
  return {
    name: folder,
    size: totalSize
  }
}).filter(f => { return f.size < MaxLimit
}).reduce(sum, 0);


export const findDeleteFolder = Object.keys(fileSystem).map((folder, _, arr) => {   
  const filesSizes = fileSystem[folder].files.reduce(sum, 0);
  const children = arr.filter(el => el !== folder && el.startsWith(folder));
  // add all children size Plus folder itself
  const totalSize = children.map(el => ({size: fileSystem[el].files.reduce(sum, 0)})).reduce(sum, 0) + filesSizes;                       
  return {
    name: folder,
    size: totalSize
  }
}).filter( f => f.size > spaceToFree )
  .sort((a, b) => a.size > b.size ? 1 : -1 );

console.log(findDeleteFolder[0].size);


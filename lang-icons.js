const config = {
  DEVICON_BASE_PATH: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons',
  ICON_SIZE: 15,
}

const Utils = (function() {
  // github -> devicon
  const langNamesMap = {
    'shell': 'bash',
    'html': 'html5',
    'css': 'css3',
    'objective-c': 'objectivec',
    'c++': 'cplusplus',
    'vim script': 'vim',
  }

  const getDeviconName = (name) => {
    const lowercasedName = name.toLowerCase();
    return langNamesMap[lowercasedName] || lowercasedName;
  }
    
  const getDeviconLink = (name) => {
    const lowercasedName = name.toLowerCase();
    return `${config.DEVICON_BASE_PATH}/${lowercasedName}/${lowercasedName}-original.svg`;
  }

  const getDeviconLinkFallback = (name) => {
    const lowercasedName = name.toLowerCase();
    return `${config.DEVICON_BASE_PATH}/${lowercasedName}/${lowercasedName}-plain.svg`;
  }

  return {
    getDeviconName,
    getDeviconLink,
    getDeviconLinkFallback
  }
})();

const createLanguageIcons = (parentNode) => {
  parentNode.querySelectorAll('[itemprop="programmingLanguage"')
    .forEach(langContainer => {
      const parent = langContainer.parentElement;
      const [textNode] = langContainer.childNodes;
      const langName = Utils.getDeviconName(textNode.nodeValue);
      const langColor = parent.firstElementChild;
      let fallbackFetched = false;
    
      const langIcon = document.createElement('img');
      langIcon.onload = () => {
        langColor.classList.add('github-lang-ext-hidden');
        langIcon.classList.add('github-lang-ext-icon');
        parent.insertBefore(langIcon, parent.firstChild);
      }
      langIcon.onerror = () => {
        if (!fallbackFetched) {
          fallbackFetched = true;
          langIcon.src = Utils.getDeviconLinkFallback(langName);
        }
      }
    
      langIcon.width = config.ICON_SIZE;
      langIcon.height = config.ICON_SIZE;
      langIcon.src = Utils.getDeviconLink(langName);  
    });  
}

createLanguageIcons(document);

// TODO: watch dom mutations
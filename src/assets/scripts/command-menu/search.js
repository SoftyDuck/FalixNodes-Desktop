const search = instantsearch({
  appId: '3HO8H0U3LM',
  apiKey: '87ae83411d02732afb349121db1047f0',
  indexName: 'app_navigation_data'
});

const hitTemplate = function(hit) {
  const name = hit._highlightResult.name.value;
  const description = hit._highlightResult.description.value;
  const icon = hit._highlightResult.symbol.value;
  const command = hit._highlightResult.command.value;
  return `
    <div onclick="${command}" class="post-item">
      <i class="fa-light fa-${icon}"></i>
      <div>
        <h2>${name}</h2>
        <p>${description}</p>
      </div>
    </div>
  `;
}

setTimeout(() => {
  search.addWidget(instantsearch.widgets.searchBox({
    container: '#search',
    placeholder: 'Type a command...',
    poweredBy: false
  })
);
}, 0500);

setTimeout(() => {
  search.addWidget(instantsearch.widgets.hits({
    container: '#search-hits',
    templates: {
      item: hitTemplate
    }
  })
);
}, 0900);
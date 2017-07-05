window.contentfulExtension.init((extension) => {
	const button = document.getElementById('button');
  button.addEventListener('click', (event) => {
	  const childEntryID = extension.entry.getSys().id;
	  const messageElement = document.getElementById('content');
	  let incomingReferences;
	  const client = contentful.createClient({
	    space: '0juryz9mth8n',
	    accessToken: 'e68a7a91fd2a7d112f1c891f68abfe0efe489f312cbe43dbc41278298d516f7a'
	  });

		client.getEntries()
	  .then((response) => {
	  	button.classList.add('cf-is-loading');
	    const parentEntries = response.items.filter((parentEntry) => {
	      return getParentEntries(parentEntry, childEntryID);
	    });
	    printMessage(parentEntries, messageElement)
	  })
	  .catch(console.error);
	});
});


const getParentEntries = (parentEntry, childEntryID) => {
	const referenceField = parentEntry.fields['category'];
	if (typeof(referenceField) == 'undefined') {
		return false;
	} else {
	  if (findInReferenceFieldValues(referenceField, childEntryID) > -1) {
	  	return parentEntry;
	  }
	}
};

const findInReferenceFieldValues = (referenceField, childEntryID) => {
	return referenceField.findIndex((referenceFieldValue) => {
    return referenceFieldValue.sys.id === childEntryID;
  })
};

const printMessage = (incomingReferences, messageElement) => {
	let content = `<p>There are no incoming references.</p>`;
	if (incomingReferences.length > 0) {
		content = `<p>I am linked by ${pluralizeEntries(incomingReferences)}:</p><ul>`;
		incomingReferences.forEach((entry) => {
			content += `<li>${generateEntryLink(entry)}</li>`;
		});
		content += '</ul>';
	}
	console.log(content);
	messageElement.innerHTML = content;
};

const pluralizeEntries = (incomingReferences) => {
	return `${incomingReferences.length} ${(incomingReferences.length > 1)?'entries':'entry'}`;
};

const generateEntryLink = (entry) => {
	return `<a href="https://app.contentful.com/spaces/0juryz9mth8n/entries/${entry.sys.id}" target="parent">${entry.fields.title}</a>`;
};

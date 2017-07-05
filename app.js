const extensionConfig = window.extensionConfig;

window.contentfulExtension.init((extension) => {
	const buttonElement = document.getElementById('button');
  buttonElement.addEventListener('click', (event) => {
	  const childEntryID = extension.entry.getSys().id;
	  const messageElement = document.getElementById('content');
	  let incomingReferences;
	  const client = contentful.createClient({
	    space: extensionConfig.spaceID,
	    accessToken: extensionConfig.cdaToken
	  });

		client.getEntries()
	  .then((response) => {
	  	buttonElement.classList.add('cf-is-loading');
	    const parentEntries = response.items.filter((parentEntry) => {
	      return getParentEntries(parentEntry, childEntryID);
	    });
	    printMessage(parentEntries, messageElement)
	  })
	  .catch(console.error);
	});
});


const getParentEntries = (parentEntry, childEntryID) => {
	const referenceField = parentEntry.fields[extensionConfig.linkingField];
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
	messageElement.innerHTML = content;
};

const pluralizeEntries = (incomingReferences) => {
	return `${incomingReferences.length} ${(incomingReferences.length > 1)?'entries':'entry'}`;
};

const generateEntryLink = (entry) => {
	return `<a href="https://app.contentful.com/spaces/0juryz9mth8n/entries/${entry.sys.id}" target="parent">${entry.fields.title}</a>`;
};

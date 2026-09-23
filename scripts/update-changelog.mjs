const header = `# Changelog

Published GitHub releases are the source of truth for this file.
The release workflow regenerates it automatically; edit release notes on GitHub.
`;

export function renderChangelog(releases) {
  const entries = releases
    .filter(release => !release.draft && release.published_at)
    .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))
    .map(release => {
      const date = release.published_at.slice(0, 10);
      const prerelease = release.prerelease ? ' (pre-release)' : '';
      const notes = release.body?.trim() || 'No release notes provided.';
      return `## [${release.tag_name}](${release.html_url})${prerelease} - ${date}\n\n${notes}`;
    });
  return `${header}\n${entries.join('\n\n') || 'No published releases yet.'}\n`;
}

export default async function updateChangelog({ github, context, core }) {
  const repo = context.repo;
  const branch = context.payload.repository.default_branch;
  const releases = await github.paginate(github.rest.repos.listReleases, {
    ...repo,
    per_page: 100,
  });
  const content = Buffer.from(renderChangelog(releases));
  const { data: current } = await github.rest.repos.getContent({
    ...repo,
    path: 'CHANGELOG.md',
    ref: branch,
  });
  if (content.equals(Buffer.from(current.content, 'base64'))) {
    core.info('Changelog is already up to date.');
    return;
  }
  await github.rest.repos.createOrUpdateFileContents({
    ...repo,
    path: 'CHANGELOG.md',
    branch,
    sha: current.sha,
    message: 'docs: update changelog from GitHub releases',
    content: content.toString('base64'),
  });
}

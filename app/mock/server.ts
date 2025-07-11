import { setupServer } from 'msw/node';
import { http, HttpResponse, ResponseResolver } from 'msw';
import { charactersPage1, charactersPage2 } from '@/mock/characters';
import { episodes } from '@/mock/episodes';
import { API_ENDPOINTS } from '@/constants/api';

export let dynamicHandler: ResponseResolver | null = null;
export function setDynamicHandler(handler: typeof dynamicHandler) {
  dynamicHandler = handler;
}

export const handlers = [
  http.get(API_ENDPOINTS.CHARACTERS, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    if (page === '2') {
      return HttpResponse.json({ results: charactersPage2, info: { pages: 2 } });
    }
    return HttpResponse.json({ results: charactersPage1, info: { pages: 2 } });
  }),
  http.get(API_ENDPOINTS.EPISODES_BY_IDS, ({ params }) => {
    const ids = params.ids as string;
    const idArr = ids.split(',').map(Number);
    const found = episodes.filter(e => idArr.includes(e.id));
    return HttpResponse.json(found.length === 1 ? found[0] : found);
  }),
  http.all('*', async (info) => {
    if (dynamicHandler) {
      const result = await dynamicHandler(info);
      if (result) return result;
    }
    return HttpResponse.json({ error: 'Not found' }, { status: 404 });
  }),
];

export const server = setupServer(...handlers); 
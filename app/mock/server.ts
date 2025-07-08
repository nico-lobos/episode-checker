import { setupServer } from 'msw/node';
import { http, HttpResponse, ResponseResolver } from 'msw';
import { charactersPage1, charactersPage2 } from './characters';
import { episodes } from './episodes';
import { API_ENDPOINTS } from './constants';

// Handler dinámico para tests (debe devolver solo HttpResponse de MSW)
export let dynamicHandler: ResponseResolver | null = null;
export function setDynamicHandler(handler: typeof dynamicHandler) {
  dynamicHandler = handler;
}

export const handlers = [
  // Characters paginated
  http.get(API_ENDPOINTS.CHARACTERS, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    if (page === '2') {
      return HttpResponse.json({ results: charactersPage2, info: { pages: 2 } });
    }
    return HttpResponse.json({ results: charactersPage1, info: { pages: 2 } });
  }),
  // Episodes by ids
  http.get(API_ENDPOINTS.EPISODES_BY_IDS, ({ params }) => {
    const ids = params.ids as string;
    const idArr = ids.split(',').map(Number);
    const found = episodes.filter(e => idArr.includes(e.id));
    return HttpResponse.json(found.length === 1 ? found[0] : found);
  }),
  // Handler dinámico (último para que pueda sobreescribir cualquier endpoint)
  http.all('*', async (info) => {
    if (dynamicHandler) {
      const result = await dynamicHandler(info);
      if (result) return result;
    }
    // Devuelve un error 404 de MSW si no hay handler
    return HttpResponse.json({ error: 'Not found' }, { status: 404 });
  }),
];

export const server = setupServer(...handlers); 